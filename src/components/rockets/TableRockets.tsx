import { useEffect } from "react";
import { GETData } from "../../services/WebServices";
import { useMissionStatusStore } from "../../store/useMissionStatusStore"
import { useMissionStore } from "../../store/useMissionStore";
import { useRocketStore } from "../../store/useRocketStore";

const TableRockets = () => {
  const { missionStatuses } = useMissionStatusStore();
  const { rockets } = useRocketStore();
  const { missions, setMissions } = useMissionStore();
  console.log('missions: ', missions)

  const getMissions = async () => {
    const response = await GETData('/missions');
    setMissions(response);
  }

  useEffect(() => {
    getMissions();
  }, []);

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-md bg-space-700 bg-opacity-80 rounded-lg shadow-xl ring-1 ring-gray-700/50"
      style={{
        background: `linear-gradient(to bottom right, rgba(16,22,36,0.8), rgba(11,15,36,0.9))`
      }}
    >
      <table className="min-w-full divide-y divide-gray-700 bg-[#0b0f24] bg-opacity-60 rounded-lg overflow-hidden text-sm">
        <thead className="bg-[#101624] text-gray-300 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Rocket</th>
            <th className="px-6 py-3 text-left">Start date</th>
            <th className="px-6 py-3 text-left">End date</th>
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
                <td className="px-6 py-4 whitespace-nowrap">{new Date(mission.start_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(mission.end_date).toLocaleDateString()}</td>
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

export default TableRockets
