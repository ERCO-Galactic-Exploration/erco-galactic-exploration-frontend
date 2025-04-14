import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("Home");
    const navItems = ["Home","Missions", "Planets", "Astronauts", "Rockets"];

    const handleLogout = () => {
        // Aquí podés limpiar cookies, tokens o hacer un fetch al logout del backend
        // Por ahora simplemente navegamos a login
        navigate("/login");
    };

    return (
        <div className="w-full h-[10%] flex items-center justify-between border-b border-gray-700 pb-2 px-2">
            <div className="text-xl font-bold text-white tracking-wider">ERCO SPACE</div>

            <div className="flex gap-4">
                {navItems.map((item) => (
                    <Link
                        to={item==="Home" ? "/" : `/${item.toLowerCase()}`}
                        key={item}
                        onClick={() => setActive(item)}
                        className={`px-3 py-1 rounded-md cursor-pointer text-sm transition-all duration-200
                            ${active === item
                                ? "text-emerald-400 border-b-2 border-emerald-400 bg-gradient-to-tr from-[#0b0f24] via-[#10b9811a] to-[#050813]"
                                : "text-gray-300 hover:text-emerald-300 hover:bg-[#10b9811a]"}
                        `}
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="px-3 py-1 rounded-md bg-space-500 bg-opacity-80 text-white font-medium tracking-wide shadow-sm border border-gray-700 cursor-pointer">
                    Yuri
                </div>

                <div
                    className="text-red-400 hover:text-red-300 cursor-pointer transition font-medium"
                    onClick={handleLogout}
                >
                    Sign Out
                </div>
            </div>
        </div>
    );
};

export default Navbar;
