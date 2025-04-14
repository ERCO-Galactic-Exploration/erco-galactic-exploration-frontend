import { useEffect, useState } from "react";
import { IMission, EMPTY_MISSION } from "../../models/Missions";
import { DELETEData } from "../../services/WebServices";

export interface IDeleteModalMission {
    modalDeleteMission: IMission | null;
    setModalDeleteMission: (mission: IMission | null) => void;
    getMissions: () => void;
}

const DeleteMission = ({ modalDeleteMission, setModalDeleteMission, getMissions }: IDeleteModalMission) => {

    const [mission, setMission] = useState<IMission>(EMPTY_MISSION);

    useEffect(() => {
        if (modalDeleteMission) {
            setMission(modalDeleteMission)
        } else {
            setMission(EMPTY_MISSION)
        }
    }, [modalDeleteMission]);

    const handleSubmit = async () => {
        const response = await DELETEData(`/missions/${mission.id_mission}`);
        console.log('response: ', response);
        getMissions();
        setModalDeleteMission(null);
    };

    if (!modalDeleteMission) return null;

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-[#0b0f24] text-white p-6 rounded-md w-[500px] border border-gray-700 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>

                <p className="text-gray-300 mb-4">
                    ¿Estás seguro de que deseas eliminar la misión <strong>{mission.name}</strong>? Esta acción no se puede deshacer.
                </p>

                <div className="space-y-4">

                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setModalDeleteMission(null)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-500">
                            Confirm
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default DeleteMission;
