import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
const user = JSON.parse(localStorage.getItem("user")) || null;

export default function LoginPage() {
    const [buttonText, setButtonText] = useState("Войти");

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
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
                setButtonText("Заргузка...");
                setTimeout(() => {
                    setButtonText("Успешно");
                }, 100);
                setTimeout(() => {
                    window.location.href = "https://atletikum.ru/account";
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
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
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs mt-2 font-bold"
                    name="password"
                />
                <button className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl mt-5 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold">
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
