import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useMissionStatusStore } from '../store/useMissionStatusStore'
import { useEffect } from 'react';
import { useRocketStore } from '../store/useRocketStore';
import { useAstronautStore } from '../store/useAstronautStore';
import { useAstronautSpecialtyStore } from '../store/useAstronautSpecialties';
import { useSolarSystemStore } from '../store/useSolarSystemStore';
import { useGalaxyStore } from '../store/useGalaxyStore';
import { usePlanetTypeStore } from '../store/usePlanetTypes';

const Layout = () => {

  const fetchMissionStatuses = useMissionStatusStore((state) => state.fetchMissionStatuses);
  const fetchRockets = useRocketStore((state) => state.fetchRockets);
  const fetchAstronautSpecialties = useAstronautSpecialtyStore((state) => state.fetchAstronautSpecialties);
  const fetchAstronauts = useAstronautStore((state) => state.fetchAstronauts);
  const fetchSolarSystems = useSolarSystemStore((state) => state.fetchSolarSystems);
  const fetchGalaxies = useGalaxyStore((state) => state.fetchGalaxies);
  const fetchPlanetTypes = usePlanetTypeStore((state) => state.fetchPlanetTypes);

  useEffect(() => {
    fetchMissionStatuses();
    fetchRockets();
    fetchAstronautSpecialties();
    fetchAstronauts();
    fetchSolarSystems();
    fetchGalaxies();
    fetchPlanetTypes();
  }, [])

  return (
    <div className="flex w-full h-screen py-8 px-10">
      <div
        className="w-full h-full flex flex-col items-center p-4 bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg text-gray-200"
        style={{
          background: `linear-gradient(to bottom right, var(--color-space-400), var(--color-space-600), var(--color-space-700))`
        }}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
