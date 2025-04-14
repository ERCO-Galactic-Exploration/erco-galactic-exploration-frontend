import { useEffect, useState } from "react";
import RankingChart from "../components/home/RankingChart"
import TendenciesChart from "../components/home/TendenciesChart"
import { GETData } from "../services/WebServices";

export interface IPlanetRanking {
    id_planet: number;
    name: string;
    ihp: number;
    classification: string;
}

export interface ITendency {
    classification: string;
    date: string; // Asumimos formato ISO (e.g. "2025-04-12")
    ihp: number;
    trend: string;
}

export interface IPlanetTendencies {
    id_planet: number;
    name: string;
    tendencies: ITendency[];
}

const Home = () => {

    const [rankings, setRankings] = useState<IPlanetRanking[]>([]);
    const [tendences, setTendences] = useState<IPlanetTendencies[]>([]);

    const getData = async () => {
        const responseRankings = await GETData("/planets/ranking");
        if (responseRankings) {
            setRankings(responseRankings);
        } else {
            console.error("Error fetching data:", responseRankings);
        }

        const responseTendences = await GETData("/planets/tendencies");
        if (responseTendences) {
            setTendences(responseTendences);
        } else {
            console.error("Error fetching data:", responseTendences);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="w-full h-[90%] flex flex-col pt-4 text-gray-300 overflow-auto">
            <div className="w-full h-[50%] flex flex-row items-center mb-4">
                <div className="w-[50%] flex ">{<RankingChart data={rankings} />}</div>
                <div className="w-[50%] flex ">{<TendenciesChart data={tendences}/>}</div>
            </div>

            <div className="w-full h-[50%]">
                table
            </div>
        </div>
    )
}

export default Home
