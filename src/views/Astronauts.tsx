import TableAstronauts from '../components/astronauts/TableAstronauts'

const Astronauts = () => {
    return (
        <div className="w-full h-[80%] flex flex-col pt-4 text-gray-300 overflow-auto">
            <TableAstronauts />
        </div>
    )
}

export default Astronauts
