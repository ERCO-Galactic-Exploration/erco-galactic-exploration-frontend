import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);


import { IPlanetTendencies } from "../../views/Home";

interface ITendenciesChartProps {
    data: IPlanetTendencies[];
}

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
};

const TendenciesChart = ({ data }: ITendenciesChartProps) => {
    const datasets = data.map((planet) => {
        // Ordenamos las tendencias por fecha (opcional)
        const sortedTendencies = [...planet.tendencies].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return {
            label: planet.name,
            data: sortedTendencies.map((tend) => ({
                x: tend.date,
                y: tend.ihp,
            })),
            borderColor: getRandomColor(),
            backgroundColor: 'transparent',
            tension: 0.3,
        };
    });

    const chartData = {
        datasets,
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                title: {
                    display: true,
                    text: 'Fecha',
                },
            },
            y: {
                min: 0,
                max: 1,
                title: {
                    display: true,
                    text: 'IHP',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default TendenciesChart
