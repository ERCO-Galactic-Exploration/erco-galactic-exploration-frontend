import { useEffect, useState } from "react";
import { GETData, POSTData, PUTData } from "../../services/WebServices";
import { useMissionStatusStore } from "../../store/useMissionStatusStore"
import { useMissionStore } from "../../store/useMissionStore";
import { useRocketStore } from "../../store/useRocketStore";
import { IMission } from "../../models/Missions";
import ModalMission from "./ModalMission";
import DeleteMission from "./DeleteMission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TableMissions = () => {

    const { missionStatuses } = useMissionStatusStore();
    const { rockets } = useRocketStore();
    const { missions, setMissions } = useMissionStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [editingMission, setEditingMission] = useState<IMission | undefined>(undefined);
    const [modalDeleteMission, setModalDeleteMission] = useState<IMission | null>(null);


    const getMissions = async () => {
        const response = await GETData('/missions');
        setMissions(response);
    }

    const handleOpenModal = (mode: "create" | "edit", mission?: IMission) => {
        setModalMode(mode);
        // console.log('mission: ', mission)
        setEditingMission(mission);
        // console.log('mode: ', mode)
        // console.log('editingMission: ', editingMission)
        setModalOpen(true);
    }

    const handleModalSubmit = async (mission: IMission, isEdit: boolean) => {
        const payload = {
            "id_mission_status": mission.mission_status.id_mission_status,
            "name": mission.name,
            "id_rocket": mission.rocket.id_rocket,
            "start_date": mission.start_date.toISOString().split("T")[0],
            "end_date": mission.end_date ? mission.end_date.toISOString().split("T")[0] : null,
        }
        console.log('payload: ', payload);

        if (isEdit) {
            const update = await PUTData(`/missions/${mission.id_mission}`, payload);
            console.log('update: ', update);
            getMissions();
            // updateMission(mission);
        } else {
            const create = await POSTData('/missions', payload);
            console.log('create: ', create);
            getMissions();
            // createMission({ ...mission, id_mission: Date.now() }); // id simulado si aún no guardás en backend

        }
    };

    useEffect(() => {
        getMissions();
    }, []);

    return (
        <div className="w-full h-full flex flex-col pt-4 text-gray-300 overflow-auto">
            <ModalMission
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                mode={modalMode}
                mission={editingMission}
            />
            <DeleteMission
                modalDeleteMission={modalDeleteMission}
                setModalDeleteMission={setModalDeleteMission}
                getMissions={getMissions}
            />
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Misiones Espaciales</h1>
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
                            New Mission
                        </button>
                    </div>
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-700 bg-[#0b0f24] bg-opacity-60 rounded-lg overflow-hidden text-sm">
                <thead className="bg-[#101624] text-gray-300 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Rocket</th>
                        <th className="px-6 py-3 text-left">Start date</th>
                        <th className="px-6 py-3 text-left">End date</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {missions.length === 0 ? (
                        <tr className="hover:bg-[#10b9811a] transition">
                            <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                        </tr>
                    ) : (
                        missions.map((mission) => (
                            <tr key={mission.id_mission} className="hover:bg-[#10b9811a] transition">
                                <td className="px-6 py-4 whitespace-nowrap">{mission.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full bg-emerald-500 bg-opacity-20 text-white text-xs font-medium">
                                        {missionStatuses.find(status => status.id_mission_status === mission.mission_status.id_mission_status)?.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{rockets.find(rocket => rocket.id_rocket === mission.rocket.id_rocket)?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(mission.start_date).toISOString().split("T")[0]}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{mission.end_date ? new Date(mission.end_date).toISOString().split("T")[0] : "Pendiente"}</td>
                                <td className=" flex flex-row px-6 items-center gap-5 py-4">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="text-xl text-blue-400 hover:text-blue-300"
                                        onClick={() => handleOpenModal("edit", mission)}
                                    />
                                    {/* <button
                                        onClick={() => handleOpenModal("edit", mission)}
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        Edit
                                    </button> */}
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="text-xl text-red-400 hover:text-red-300"
                                        onClick={() => setModalDeleteMission(mission)}
                                    />
                                    {/* <button
                                        onClick={() => setModalDeleteMission(mission)}
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))
                    )}
                    {/* <tr className="hover:bg-[#10b9811a] transition">
                            <td className="px-6 py-4 whitespace-nowrap">Andromeda</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 rounded-full bg-emerald-500 bg-opacity-20 text-emerald-300 text-xs font-medium">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">Falcon 9</td>
                            <td className="px-6 py-4 whitespace-nowrap">2025-04-01</td>
                            <td className="px-6 py-4 whitespace-nowrap">2025-06-20</td>
                        </tr> */}
                    {/* Repetí más rows según tu data */}
                </tbody>
            </table>
        </div>
    )
}

export default TableMissions
