import { plugins } from "chart.js";
import { callback } from "chart.js/helpers";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { IPlanetRanking } from "../../views/Home";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getGradient = (ctx: CanvasRenderingContext2D, classification: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    switch (classification) {
        case "Planeta hostil, inhabitable":
            gradient.addColorStop(0, "#ff7f7f"); // tono rojizo claro
            gradient.addColorStop(1, "#ff0000"); // rojo intenso
            break;
        case "Habitabilidad muy baja, requiere tecnología avanzada":
            gradient.addColorStop(0, "#ffbf80"); // naranja claro
            gradient.addColorStop(1, "#ff8000"); // naranja fuerte
            break;
        case "Potencialmente habitable con infraestructura significativa":
            gradient.addColorStop(0, "#ffff99"); // amarillo pálido
            gradient.addColorStop(1, "#ffff33"); // amarillo brillante
            break;
        case "Habitable con modificaciones menores":
            gradient.addColorStop(0, "#b3ffb3"); // verde claro
            gradient.addColorStop(1, "#33cc33"); // verde intenso
            break;
        case "Altamente habitable, similar a la Tierra":
            gradient.addColorStop(0, "#99ffff"); // cian claro
            gradient.addColorStop(1, "#00cccc"); // cian oscuro
            break;
        default:
            gradient.addColorStop(0, "rgba(75,192,192,0.6)");
            gradient.addColorStop(1, "rgba(75,192,192,1)");
            break;
    }
    return gradient;
};

interface IRankingChart {
    data: IPlanetRanking[]
}

const RankingChart = ({ data }: IRankingChart) => {

    // const data: IPlanetRanking[] = [
    //     { id_planet: 1, name: "Mercury", ihp: 0.1, classification: "terrestrial" },
    //     { id_planet: 2, name: "Venus", ihp: 0.9, classification: "terrestrial" },
    //     { id_planet: 3, name: "Earth", ihp: 1.0, classification: "terrestrial" },
    //     { id_planet: 4, name: "Mars", ihp: 0.5, classification: "terrestrial" },
    //     { id_planet: 5, name: "Jupiter", ihp: 2.5, classification: "gas giant" },
    //     { id_planet: 6, name: "Saturn", ihp: 2.0, classification: "gas giant" },
    //     { id_planet: 7, name: "Uranus", ihp: 1.5, classification: "ice giant" },
    //     { id_planet: 8, name: "Neptune", ihp: 1.8, classification: "ice giant" },
    // ];

    const labels = data.map((planet) => planet.name);
    const values = data.map((planet) => planet.ihp);
    const classifications = data.map((planet) => planet.classification);

    const colors = data.map((planet) => {
        switch (planet.classification) {
            case "terrestrial":
                return "#FF6384";
            case "gas giant":
                return "#36A2EB";
            case "ice giant":
                return "#FFCE56";
            default:
                return "#FF6384";
        }
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: 'IHP',
                data: values,
                // backgroundColor: colors,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 1
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const index = context.dataIndex;
                        const ihp = context.parsed.y;
                        const classification = classifications[index];
                        return `IHP: ${ihp} - ${classification}`;
                    }
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
    // return (
    //     <div>
    //         RankingChart
    //     </div>
    // )
}

export default RankingChart
