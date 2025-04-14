import TablePlanets from '../components/planets/TablePlanets'

const Planets = () => {
    return (
        <div className="w-full h-[80%] flex flex-col pt-4 text-gray-300 overflow-auto">
            <TablePlanets />
        </div>
    )
}

export default Planets
