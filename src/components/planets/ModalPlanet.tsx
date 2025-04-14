import { useEffect, useState } from "react";
import { EMPTY_PLANET, IPlanet } from "../../models/Planets";
import { useSolarSystemStore } from "../../store/useSolarSystemStore";
import { useGalaxyStore } from "../../store/useGalaxyStore";
import { usePlanetTypeStore } from "../../store/usePlanetTypes";
import { usePlanetaryScanStore } from "../../store/usePlanetaryScan";
import { DELETEData, GETData, POSTData } from "../../services/WebServices";
import { EMPTY_PLANETARY_SCAN, IPlanetaryScan } from "../../models/PlanetaryScans";
import { useMissionStore } from "../../store/useMissionStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export interface IModalPlanet {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (planet: IPlanet, isEdit: boolean) => void;
  mode: "create" | "edit";
  planet?: IPlanet;
}

interface IErrors {
  temperature?: string;
  atmosphere?: string;
  resources?: string;
}

const ModalPlanet = ({ isOpen, onClose, onSubmit, mode, planet }: IModalPlanet) => {
  const { solarSystems } = useSolarSystemStore();
  const { galaxies } = useGalaxyStore();
  const { planetTypes } = usePlanetTypeStore();
  const { planetaryScans, setPlanetaryScans } = usePlanetaryScanStore();
  const { missions, setMissions } = useMissionStore();

  const [form, setForm] = useState<IPlanet>(EMPTY_PLANET);
  const [newScan, setNewScan] = useState<IPlanetaryScan>(EMPTY_PLANETARY_SCAN);
  const [isActiveScan, setIsActiveScan] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    typeForm: string
  ) => {
    const { name, value } = e.target;

    if (typeForm === "scan") {
      // Si se trata de los campos que deben ser numéricos (temperature, atmosphere, resources)
      if (name === "temperature" || name === "atmosphere" || name === "resources") {
        // Convertir el valor a número (float)
        const num = parseFloat(value);

        // Verificar que el número esté entre 0 y 1
        if (isNaN(num) || num < 0 || num > 1) {
          setErrors((prev) => ({
            ...prev,
            [name]: "El valor debe estar entre 0 y 1"
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            [name]: ""
          }));

          setNewScan((prev) => ({
            ...prev,
            [name]: num
          }));
        }
      } else {
        setNewScan((prev) => ({
          ...prev,
          [name]: name === "scanning_date" ? new Date(value) : value,
        }));
      }
    } else if (typeForm === "planet") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: "solar_system" | "galaxy" | "planet_type" | "mission", typeForm: string) => {
    const id = Number(e.target.value);

    if (typeForm === "scan") {
      if (field === "mission") {
        const selectedMission = missions.find((m) => m.id_mission === id);
        if (selectedMission) {
          setNewScan((prev) => ({ ...prev, mission: selectedMission }));
        }
      }
    } else if (typeForm === "planet") {
      if (field === "solar_system") {
        const selectedSolarSystem = solarSystems.find((s) => s.id_solar_system === id);
        if (selectedSolarSystem) {
          setForm((prev) => ({ ...prev, solar_system: selectedSolarSystem }));
        }
      } else if (field === "galaxy") {
        const selectedGalaxy = galaxies.find((g) => g.id_galaxy === id);
        if (selectedGalaxy) {
          setForm((prev) => ({ ...prev, galaxy: selectedGalaxy }));
        }
      } else if (field === "planet_type") {
        const selectedPlanetType = planetTypes.find((p) => p.id_planet_type === id);
        if (selectedPlanetType) {
          setForm((prev) => ({ ...prev, planet_type: selectedPlanetType }));
        }
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(form, mode === "edit");
    onClose();
  };

  // console.log('selectedRows: ', selectedRows);
  const handleCreateScan = async () => {
    if (errors.temperature || errors.atmosphere || errors.resources) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const payload = {
      "id_mission": newScan.mission.id_mission,
      "scanning_date": newScan.scanning_date.toISOString().split("T")[0],
      "temperature": newScan.temperature,
      "atmosphere": newScan.atmosphere,
      "resources": newScan.resources
    }

    const responseAssign = await POSTData(`/planets/${form.id_planet}/scans`, payload);
    if (responseAssign) {
      // console.log('responseAssign: ', responseAssign);
      getPlanetaryScans();
    } else {
      console.error("Error assigning crew members.");
    }
  }

  const handleDeleteScan = async (id_planet: number, id_mission: number) => {
    const responseDeleteScan = await DELETEData(`/planets/${id_planet}/scans/${id_mission}`);
    console.log('responseDeleteScan: ', responseDeleteScan);
    if (responseDeleteScan) {
      getPlanetaryScans();
    }

  }

  const getPlanetaryScans = async () => {
    const response = await GETData(`/planets/${form.id_planet}/scans`);
    setPlanetaryScans(response)
  }
  const getMissions = async () => {
    const response = await GETData('/missions');
    setMissions(response);
  }

  useEffect(() => {
    if (mode === "edit" && planet) {
      setForm(planet);

    } else {
      setForm(EMPTY_PLANET);
    }
  }, [mode, planet]);

  // console.log('planetaryScans: ', planetaryScans);

  useEffect(() => {
    if (isActiveScan && form.id_planet && planetaryScans.length === 0) {
      getPlanetaryScans();
      getMissions();
    }
  }, [isActiveScan, form.id_planet]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#0b0f24] text-white p-6 rounded-md w-[126vh] border border-gray-700 shadow-xl max-h-[80vh]">
        <div className="flex flex-row justify-between items-center mb-8 border-b border-gray-700 ">
          <h2
            className={`text-xl font-semibold cursor-pointer ${isActiveScan ? 'text-white' : 'text-emerald-400'} ${mode === "edit" ? 'titleModalMission' : ''}`}
            onClick={() => setIsActiveScan(false)}
          >{mode === "edit" ? "Edit Planet" : "Create Planet"}</h2>
          <h2
            className={`text-xl font-semibold cursor-pointer ${isActiveScan ? 'text-emerald-400' : 'text-white'} titleModalMission`}
            onClick={() => setIsActiveScan(!isActiveScan)}
          >{mode === "edit" ? "Scans" : ""}</h2>
        </div>

        {isActiveScan ? (
          <div className="flex flex-col max-h-[65vh]">
            <div className="flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar py-2">
              <div className="flex flex-row gap-2 mt-4 mb-2 items-center">
                <div className="w-[60%] flex justify-end">
                  <h2 className="text-lg font-semibold mb-4">Register new scan</h2>
                </div>
                <div className="w-[40%] flex justify-end">
                  <button onClick={handleCreateScan} className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-500">
                    Create
                  </button>
                </div>
              </div>
              <div className="space-y-4 px-1">
                <select
                  value={newScan.mission.id_mission}
                  onChange={(e) => handleSelectChange(e, "mission", "scan")}
                  className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select Mission</option>
                  {missions
                    .filter((mission) =>
                      !planetaryScans.some((scan) => scan.mission.id_mission === mission.id_mission)
                    )
                    .map((mission) => (
                      <option key={mission.id_mission} value={mission.id_mission}>
                        {mission.name}
                      </option>
                    ))}
                </select>
                <input
                  type="date"
                  name="scanning_date"
                  value={newScan.scanning_date ? newScan.scanning_date.toISOString().split("T")[0] : ""}
                  onChange={(e) => handleChange(e, "scan")}
                  className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  name="temperature"
                  value={newScan.temperature}
                  onChange={(e) => handleChange(e, "scan")}
                  placeholder="Temperature"
                  className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.temperature && (
                  <span className="text-red-500 text-sm mb-2">{errors.temperature}</span>
                )}

                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  name="atmosphere"
                  value={newScan.atmosphere}
                  onChange={(e) => handleChange(e, "scan")}
                  placeholder="Atmosphere"
                  className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.atmosphere && (
                  <span className="text-red-500 text-sm mb-2">{errors.atmosphere}</span>
                )}
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  name="resources"
                  value={newScan.resources}
                  onChange={(e) => handleChange(e, "scan")}
                  placeholder="Resources"
                  className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.resources && (
                  <span className="text-red-500 text-sm mb-2">{errors.resources}</span>
                )}
              </div>

              <h2 className="text-lg font-semibold mb-4 mt-4 text-center">Scans to planet {planet?.name}</h2>
              <table className="min-w-full divide-y divide-gray-700 bg-[#0b0f24] bg-opacity-60 rounded-lg overflow-hidden text-sm">
                <thead className="bg-[#101624] text-gray-300 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Mission</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Temperature</th>
                    <th className="px-6 py-3 text-left">Atmosphere</th>
                    <th className="px-6 py-3 text-left">Resources</th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {planetaryScans.length === 0 ? (
                    <tr className="hover:bg-[#10b9811a] transition">
                      <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                    </tr>
                  ) : (
                    planetaryScans
                      // .filter((planetaryScan) =>
                      //   !missionCrews.some((crew) => crew.astronaut.id_astronaut === astronaut.id_astronaut)
                      // )
                      .map((planetaryScan) => (
                        <tr key={`${planetaryScan.planet.id_planet}_${planetaryScan.mission.id_mission}`} className="hover:bg-[#10b9811a] transition">
                          <td className="px-6 py-4 whitespace-nowrap">{planetaryScan.mission.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{new Date(planetaryScan.scanning_date).toISOString().split("T")[0]}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{planetaryScan.temperature}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{planetaryScan.atmosphere}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{planetaryScan.resources}</td>
                          <td className=" flex flex-row px-6 items-center gap-5 py-4">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-xl text-blue-400 hover:text-blue-300"
                            // onClick={() => handleOpenModal("edit", planet)}
                            />
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="text-xl text-red-400 hover:text-red-300"
                              onClick={() => handleDeleteScan(planetaryScan.planet.id_planet, planetaryScan.mission.id_mission)}
                            />
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setIsActiveScan(false);
                  onClose();
                }}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={(e) => handleChange(e, "planet")}
              placeholder="Planet Name"
              className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <select
              value={form.solar_system.id_solar_system}
              onChange={(e) => handleSelectChange(e, "solar_system", "planet")}
              className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Solar System</option>
              {solarSystems.map((solarSystem) => (
                <option key={solarSystem.id_solar_system} value={solarSystem.id_solar_system}>
                  {solarSystem.name}
                </option>
              ))}
            </select>

            <select
              value={form.galaxy.id_galaxy}
              onChange={(e) => handleSelectChange(e, "galaxy", "planet")}
              className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Galaxy</option>
              {galaxies.map((galaxy) => (
                <option key={galaxy.id_galaxy} value={galaxy.id_galaxy}>
                  {galaxy.name}
                </option>
              ))}
            </select>

            <select
              value={form.planet_type.id_planet_type}
              onChange={(e) => handleSelectChange(e, "planet_type", "planet")}
              className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Planet Type</option>
              {planetTypes.map((planet_type) => (
                <option key={planet_type.id_planet_type} value={planet_type.id_planet_type}>
                  {planet_type.name}
                </option>
              ))}
            </select>
            <input
              name="distance"
              value={form.distance ? form.distance : ""}
              onChange={(e) => handleChange(e, "planet")}
              placeholder="Distance"
              className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setIsActiveScan(false);
                  onClose();
                }}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-500">
                {mode === "edit" ? "Update" : "Create"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalPlanet
