import { useState } from "react";
import { POSTData } from "../services/WebServices";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async () => {
        // console.log(user);

        try {
            const response = await POSTData('/auth/login', user);
            console.log('response: ', response);
            console.log(response?.status_code);
            if (response?.status_code === 200) {
                
                navigate('/missions')
                // Aquí puedes guardar el token en el localStorage o en el estado global
            } else {
                console.error('Login failed', response.message);
            }

        } catch (err) {
            console.error('Error during login', err);
        }
    }

    return (
        <div className="w-full h-screen flex bg-login p-4">

            <div className="w-[40%] flex flex-col justify-center items-center px-10 py-12 bg-opacity-90 bg-space-500 rounded-lg shadow-lg text-gray-200">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-3xl font-bold text-white">Iniciar sesión</h2>
                    <p className="text-sm text-gray-400">Explorá el universo con nosotros 🚀</p>

                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium mb-1">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="p-2 rounded-md bg-[#101624] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="p-2 rounded-md bg-[#101624] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-md transition font-semibold"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
