import { useEffect, useState } from "react";
import { useMissionStatusStore } from "../../store/useMissionStatusStore";
import { useRocketStore } from "../../store/useRocketStore";
import { IMission, EMPTY_MISSION } from "../../models/Missions";
import { useAstronautStore } from "../../store/useAstronautStore";
import { DELETEData, GETData, POSTData } from "../../services/WebServices";
import { useMissionCrewStore } from "../../store/useMissionCrewStore";

export interface IModalMission {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (mission: IMission, isEdit: boolean) => void;
    mode: "create" | "edit";
    mission?: IMission;
}

const ModalMission = ({ isOpen, onClose, onSubmit, mode, mission }: IModalMission) => {
    const { missionStatuses } = useMissionStatusStore();
    const { astronauts } = useAstronautStore();
    const { rockets } = useRocketStore();
    const { missionCrews, setMissionCrews } = useMissionCrewStore();

    const [form, setForm] = useState<IMission>(EMPTY_MISSION);
    const [asiggnCrew, setAsiggnCrew] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "start_date" || name === "end_date" ? new Date(value) : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: "rocket" | "mission_status") => {
        const id = Number(e.target.value);
        if (field === "rocket") {
            const selectedRocket = rockets.find((r) => r.id_rocket === id);
            if (selectedRocket) {
                setForm((prev) => ({ ...prev, rocket: selectedRocket }));
            }
        } else {
            const selectedStatus = missionStatuses.find((s) => s.id_mission_status === id);
            if (selectedStatus) {
                setForm((prev) => ({ ...prev, mission_status: selectedStatus }));
            }
        }
    };

    const handleSubmit = () => {
        onSubmit(form, mode === "edit");
        onClose();
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((rowId) => rowId !== id) // Desmarcar
                : [...prevSelected, id] // Marcar
        );
    };

    const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRows(astronauts.map((item) => item.id_astronaut)); // Seleccionar todos
        } else {
            setSelectedRows([]); // Desmarcar todos
        }
    };

    // console.log('selectedRows: ', selectedRows);
    const handleAssignCrew = async () => {
        const payload = {
            "id_astronaut": selectedRows
        }
        const responseAssign = await POSTData(`/missions/${form.id_mission}/assign_astronaut`, payload);
        if (responseAssign) {
            // console.log('responseAssign: ', responseAssign);
            getMissionCrews();
            setSelectedRows([]);
        } else {
            console.error("Error assigning crew members.");
        }
    }

    const handleUnnasignCrew = async (id_mission: number, id_astronaut: number) => {
        const responseUnassign = await DELETEData(`/missions/${id_mission}/astronauts/${id_astronaut}`);
        console.log('responseUnassign: ', responseUnassign);
        if (responseUnassign) {
            getMissionCrews();
        }

    }

    const getMissionCrews = async () => {
        const response = await GETData(`/missions/${form.id_mission}/astronauts`);
        setMissionCrews(response)
    }

    useEffect(() => {
        if (mode === "edit" && mission) {
            setForm({
                ...mission,
                start_date: new Date(mission.start_date),
                end_date: mission.end_date ? new Date(mission.end_date) : null,
            });

        } else {
            setForm(EMPTY_MISSION);
        }
    }, [mode, mission]);

    // console.log('missionCrews: ', missionCrews);

    useEffect(() => {
        if (asiggnCrew && form.id_mission && missionCrews.length === 0) {
            getMissionCrews();
        }
    }, [asiggnCrew, form.id_mission]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-[#0b0f24] text-white p-6 rounded-md w-[500px] border border-gray-700 shadow-xl">
                <div className="flex flex-row justify-between items-center mb-8 border-b border-gray-700 ">
                    <h2
                        className={`text-xl font-semibold cursor-pointer ${asiggnCrew ? 'text-white' : 'text-emerald-400'} ${mode === "edit" ? 'titleModalMission' : ''}`}
                        onClick={() => setAsiggnCrew(false)}
                    >{mode === "edit" ? "Edit Mission" : "Create Mission"}</h2>
                    <h2
                        className={`text-xl font-semibold cursor-pointer ${asiggnCrew ? 'text-emerald-400' : 'text-white'} titleModalMission`}
                        onClick={() => setAsiggnCrew(!asiggnCrew)}
                    >{mode === "edit" ? "Mission Crews" : ""}</h2>
                </div>

                {asiggnCrew ? (
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-center">Assigned Crews</h2>
                        <table className="min-w-full divide-y divide-gray-700 bg-[#0b0f24] bg-opacity-60 rounded-lg overflow-hidden text-sm">
                            <thead className="bg-[#101624] text-gray-300 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 text-left">Name</th>
                                    <th className="px-6 py-3 text-left">Specialty</th>
                                    <th className="px-6 py-3 text-left"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {missionCrews.length === 0 ? (
                                    <tr className="hover:bg-[#10b9811a] transition">
                                        <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                                    </tr>
                                ) : (
                                    missionCrews.map((missionCrew) => (
                                        <tr key={missionCrew.astronaut.id_astronaut} className="hover:bg-[#10b9811a] transition">
                                            <td className="px-6 py-4 whitespace-nowrap">{missionCrew.astronaut.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {missionCrew.astronaut.specialty.name}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-red-500 text-italic cursor-pointer"
                                                onClick={() => handleUnnasignCrew(missionCrew.mission.id_mission, missionCrew.astronaut.id_astronaut)}
                                            >Unnasing</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <h2 className="text-lg font-semibold mb-4 mt-4 text-center">Available Crews</h2>
                        <table className="min-w-full divide-y divide-gray-700 bg-[#0b0f24] bg-opacity-60 rounded-lg overflow-hidden text-sm">
                            <thead className="bg-[#101624] text-gray-300 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === astronauts.length}
                                            onChange={handleSelectAllChange}
                                            className="h-4 w-4"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left">Name</th>
                                    <th className="px-6 py-3 text-left">Specialty</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {astronauts.length === 0 ? (
                                    <tr className="hover:bg-[#10b9811a] transition">
                                        <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                                    </tr>
                                ) : (
                                    astronauts
                                        .filter((astronaut) =>
                                            !missionCrews.some((crew) => crew.astronaut.id_astronaut === astronaut.id_astronaut)
                                        )
                                        .map((astronaut) => (
                                            <tr key={astronaut.id_astronaut} className="hover:bg-[#10b9811a] transition">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(astronaut.id_astronaut)}
                                                        onChange={() => handleCheckboxChange(astronaut.id_astronaut)}
                                                        className="h-4 w-4"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{astronaut.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{astronaut.specialty.name}</td>

                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setAsiggnCrew(false);
                                    onClose();
                                }}
                                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button onClick={handleAssignCrew} className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-500">
                                Assign
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Mission Name"
                            className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <select
                            value={form.mission_status.id_mission_status}
                            onChange={(e) => handleSelectChange(e, "mission_status")}
                            className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Select Status</option>
                            {missionStatuses.map((status) => (
                                <option key={status.id_mission_status} value={status.id_mission_status}>
                                    {status.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={form.rocket.id_rocket}
                            onChange={(e) => handleSelectChange(e, "rocket")}
                            className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Select Rocket</option>
                            {rockets.map((rocket) => (
                                <option key={rocket.id_rocket} value={rocket.id_rocket}>
                                    {rocket.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="date"
                            name="start_date"
                            value={form.start_date ? form.start_date.toISOString().split("T")[0] : ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                            type="date"
                            name="end_date"
                            value={form.end_date ? form.end_date.toISOString().split("T")[0] : ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-space-500 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setAsiggnCrew(false);
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
};

export default ModalMission;
