import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginPage() {
    const [buttonText, setButtonText] = useState("Войти");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        setButtonText(
            <div className="flex justify-center items-center text-center">
                <p className="animate-spin text-lg p-1">
                    <AiOutlineLoading3Quarters />
                </p>
            </div>
        );
        let config = {
            method: "post",
            url: "https://test.isroil-holding.uz/api/user/signin",
            headers: {
                "Content-Type": "application/json",
            },
            data: Object.fromEntries(new FormData(ev.target)),
        };

        axios(config)
            .then((response) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.innerData)
                );
                console.log(response);
                setTimeout(() => {
                    window.location.href = "https://atletikum.ru/account";
                }, 1000);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
                console.log(error);
                setButtonText("Войти");
            });
    }

    return (
        <div className="p-4 max-w-screen-lg m-auto mt-28">
            <form
                action=""
                className="flex flex-col justify-center items-center"
                onSubmit={handleLoginSubmit}
            >
                <input
                    type="tel"
                    required
                    placeholder="Номер телефона"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold"
                    name="phone"
                    maxLength={11}
                />
                <input
                    type="password"
                    required
                    placeholder="Пароль"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs mt-2 font-bold mb-2"
                    name="password"
                />
                <div className="mt-1 flex items-center justify-center text-center">
                    <p>{errorMessage}</p>
                </div>
                <button className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl mt-5 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold text-base">
                    {buttonText}
                </button>
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
