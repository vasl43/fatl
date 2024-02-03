import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [animate, setAnimate] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const SuccesAnimation = () => {
        return (
            <div className="bg-white w-full fixed top-0 left-0 h-full m-auto p-4">
                <div className="w-full flex flex-col justify-center items-center mt-32">
                    <h2 className="text-xl">Регистрация прошла успешно!</h2>
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

    const dateMask = (e) => {
        const input = e.target.value;
        if (/^\d{0,2}[./]?\d{0,2}[./]?\d{0,4}$/i.test(input)) {
            const formattedInput = input
                .replace(/[^\d]/g, "")
                .replace(/(\d{2})(\d{2})(\d{0,4})/, "$1.$2.$3");
            setBirthday(formattedInput);
        }
    };

    async function registerUser(ev) {
        ev.preventDefault();
        setLoading(true);
        try {
            await axios.post("/register", {
                name,
                birthday,
                phone,
                password,
            });
            setAnimate(true);
            setTimeout(function () {
                window.open("/login", "_self");
            }, 3000);
        } catch (e) {
            setError(true);
        }
        setLoading(false);
    }

    return (
        <div className="p-4 max-w-screen-lg m-auto my-16 mt-28">
            <form
                action=""
                className="flex flex-col justify-center items-center"
                onSubmit={registerUser}
            >
                <input
                    type="text"
                    required
                    placeholder="Ф.И.О ребенка"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold"
                    onChange={(ev) => setName(ev.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Дата рождения ребенка"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2"
                    onChange={dateMask}
                    onFocus={(ev) => (ev.target.placeholder = "дд.мм.гггг")}
                    value={birthday}
                />
                <input
                    type="text"
                    required
                    placeholder="Номер телефона"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2"
                    value={phone}
                    onChange={phoneMask}
                    maxLength={11}
                />
                <input
                    type="password"
                    required
                    placeholder="Пароль"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2"
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button
                    disabled={loading}
                    className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl mt-5 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold"
                >
                    {loading ? "Загрузка..." : "Зарегистрироваться"}
                </button>
                {animate && <SuccesAnimation />}
                {error && <p>Произошла ошибка</p>}
                <Link
                    to={"/privacy"}
                    className="mt-4 cursor-pointer font-regular text-center text-xs"
                >
                    Нажимая кнопку "Зарегистрироваться",
                    <br /> вы соглашаетесь с политокой обработки персональных
                    данных
                </Link>
                <Link
                    to={"/login"}
                    className="text-black mt-4 cursor-pointer font-bold"
                >
                    Я уже зарегистрирован
                </Link>
            </form>
        </div>
    );
}
