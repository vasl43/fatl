import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
const user = JSON.parse(localStorage.getItem("user")) || null;

export default function RegisterPage() {
    const [buttonText, setButtonText] = useState("Зарегистрироваться");

    async function registerUser(ev) {
        ev.preventDefault();

        let config = {
            method: "post",
            url: "https://test.isroil-holding.uz/api/user/signup",
            headers: {
                "Content-Type": "application/json",
            },
            data: Object.fromEntries(new FormData(ev.target)),
        };

        axios(config)
            .then((response) => {
                setButtonText("Зарегистрироваться");
                setTimeout(() => {
                    setButtonText("Успешно");
                }, 300);
                setTimeout(() => {
                    window.location.href = "https://atletikum.ru/login";
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
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
                    name="fullname"
                    required
                    placeholder="Ф.И.О ребенка"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold"
                />
                <input
                    type="text"
                    name="brithday"
                    required
                    placeholder="Дата рождения ребенка"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2"
                />
                <input
                    type="text"
                    name="phone"
                    required
                    placeholder="Номер телефона"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2"
                    maxLength={11}
                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="Пароль"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2"
                />
                <button className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl mt-5 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold">
                    {buttonText}
                </button>
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
