import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RegisterPage() {
    const [buttonText, setButtonText] = useState("Зарегистрироваться");
    const [errorMessage, setErrorMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const placeholderText = isFocused ? "ГГГГ-ММ-ДД" : "Дата рождения ребенка";

    async function registerUser(ev) {
        ev.preventDefault();
        setButtonText(
            <div className="flex justify-center items-center text-center">
                <p className="animate-spin text-2xl">
                    <AiOutlineLoading3Quarters />
                </p>
            </div>
        );

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
                setTimeout(() => {
                    window.location.href = "https://atletikum.ru/login";
                }, 1000);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
                console.log(error);
                setButtonText("Зарегистрироваться");
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
                    placeholder={placeholderText}
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2"
                    maxLength={10}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <input
                    type="tel"
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
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold mt-2 mb-2"
                />
                <div className="mt-1 flex items-center justify-center text-center">
                    <p>{errorMessage}</p>
                </div>
                <button className="border-none outline-none shadow-none text-white bg-black h-14 rounded-xl mt-5 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold text-base">
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
