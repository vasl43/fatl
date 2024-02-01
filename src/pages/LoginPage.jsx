import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const [animate, setAnimate] = useState(false);

    const SuccesAnimation = () => {
        return (
            <div className="bg-white w-full fixed top-0 left-0 h-full m-auto p-4">
                <div className="w-full flex flex-col justify-center items-center mt-32">
                    <video src="/suc.mp4" autoplay loop muted controls webkit-playsinline playsinline></video>
                    <h2 className="text-xl">Успешный вход!</h2>
                </div>
            </div>
        );
    };

    const phoneMask = (e) => {
        const input = e.target.value.replace(/\D/g, "");
        let formattedNumber;

        if (input.charAt(0) !== "8" && input.charAt(0) !== "7") {
            formattedNumber = `8${input}`;
        } else if (input.charAt(0) === "7") {
            formattedNumber = `8${input.slice(1)}`;
        } else {
            formattedNumber = input;
        }
        setPhone(formattedNumber);
    };

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post("/login", { phone, password });
            setUser(data);
            setAnimate(true);
            setTimeout(function () {
                window.open("/account", "_self");
            }, 3000);
        } catch (e) {
            alert("Ошибка");
        }
    }

    return (
        <div className="p-4 max-w-screen-lg m-auto mt-28">
            <form
                action=""
                className="flex flex-col justify-center items-center"
                onSubmit={handleLoginSubmit}
            >
                <input
                    type="text"
                    required
                    placeholder="Номер телефона"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold"
                    value={phone}
                    onChange={phoneMask}
                    maxLength={11}
                />
                <input
                    type="password"
                    required
                    placeholder="Пароль"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs mt-2 font-bold"
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl mt-5 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold">
                    Войти
                </button>
                {animate && <SuccesAnimation />}
                <Link
                    to={"/register"}
                    className="text-black mt-4 cursor-pointer font-bold"
                >
                    Зарегистрироваться
                </Link>
            </form>
        </div>
    );
}
