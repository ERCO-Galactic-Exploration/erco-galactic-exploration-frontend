import { useEffect, useState } from "react";
import { GETData, POSTData, PUTData } from "../../services/WebServices";
import ModalPlanet from "./ModalPlanet";
import DeletePlanet from "./DeletePlanet";
import { useSolarSystemStore } from "../../store/useSolarSystemStore";
import { useGalaxyStore } from "../../store/useGalaxyStore";
import { usePlanetTypeStore } from "../../store/usePlanetTypes";
import { usePlanetStore } from "../../store/usePlanetStore";
import { IPlanet } from "../../models/Planets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TablePlanets = () => {

    const { solarSystems } = useSolarSystemStore();
    const { galaxies } = useGalaxyStore();
    const { planetTypes } = usePlanetTypeStore();
    const { planets, setPlanets } = usePlanetStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [editingPlanet, setEditingPlanet] = useState<IPlanet | undefined>(undefined);
    const [modalDeletePlanet, setModalDeletePlanet] = useState<IPlanet | null>(null);


    const getPlanets = async () => {
        const response = await GETData('/planets');
        setPlanets(response);
    }

    const handleOpenModal = (mode: "create" | "edit", planet?: IPlanet) => {
        setModalMode(mode);
        // console.log('mission: ', mission)
        setEditingPlanet(planet);
        // console.log('mode: ', mode)
        // console.log('editingMission: ', editingMission)
        setModalOpen(true);
    }

    const handleModalSubmit = async (planet: IPlanet, isEdit: boolean) => {
        const payload = {
            "distance": planet.distance,
            "id_galaxy": planet.galaxy.id_galaxy,
            "id_planet_type": planet.planet_type.id_planet_type,
            "id_solar_system": planet.solar_system.id_solar_system,
            "name": planet.name
        }
        console.log('payload: ', payload);

        if (isEdit) {
            const update = await PUTData(`/planets/${planet.id_planet}`, payload);
            console.log('update: ', update);
            getPlanets();
            // updateMission(mission);
        } else {
            const create = await POSTData('/planets', payload);
            console.log('create: ', create);
            getPlanets();
            // createMission({ ...mission, id_mission: Date.now() }); // id simulado si aún no guardás en backend

        }
    };

    useEffect(() => {
        getPlanets();
    }, []);

    return (
        <div className="w-full h-full flex flex-col pt-4 text-gray-300 overflow-auto">
            <ModalPlanet
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                mode={modalMode}
                planet={editingPlanet}
            />
            <DeletePlanet
                modalDeletePlanet={modalDeletePlanet}
                setModalDeletePlanet={setModalDeletePlanet}
                getPlanets={getPlanets}
            />
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Planets</h1>
                    <p className="text-sm text-gray-400 mb-4">
                        Explorá los misterios del universo con nuestra flota espacial.
                    </p>
                </div>
                <div className="relative gap-2 flex flex-row">
                    <div className="flex flex-row justify-center items-center gap-2 mb-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500">
                        +
                        <button
                            onClick={() => handleOpenModal("create")}
                            className=""
                        >
                            New Planet
                        </button>
                    </div>
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-700 bg-[#0b0f24] bg-opacity-60 rounded-lg overflow-hidden text-sm">
                <thead className="bg-[#101624] text-gray-300 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Solar System</th>
                        <th className="px-6 py-3 text-left">Galaxy</th>
                        <th className="px-6 py-3 text-left">Distance</th>
                        <th className="px-6 py-3 text-left">Type</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {planets.length === 0 ? (
                        <tr className="hover:bg-[#10b9811a] transition">
                            <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                        </tr>
                    ) : (
                        planets.map((planet) => (
                            <tr key={planet.id_planet} className="hover:bg-[#10b9811a] transition">
                                <td className="px-6 py-4 whitespace-nowrap">{planet.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {solarSystems.find(solarSystem => solarSystem.id_solar_system === planet.solar_system.id_solar_system)?.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{galaxies.find(galaxy => galaxy.id_galaxy === planet.galaxy.id_galaxy)?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{planet.distance}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{planetTypes.find(planetType => planetType.id_planet_type === planet.planet_type.id_planet_type)?.name}</td>
                                <td className=" flex flex-row px-6 items-center gap-5 py-4">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="text-xl text-blue-400 hover:text-blue-300"
                                        onClick={() => handleOpenModal("edit", planet)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="text-xl text-red-400 hover:text-red-300"
                                        onClick={() => setModalDeletePlanet(planet)}
                                    />
                                </td>
                            </tr>
                        ))
                    )}

                </tbody>
            </table>
        </div>

    )
}

export default TablePlanets
