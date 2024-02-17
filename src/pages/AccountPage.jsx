import axios from "axios";
import { useState } from "react";
const user = JSON.parse(localStorage.getItem("user")) || null;
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export default function AccountPage() {
    const [buttonText, setButtonText] = useState("Продлить");
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date();
    const secondDate = new Date(user.expiration);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    async function payment(ev) {
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
            url: "https://test.isroil-holding.uz/api/payment",
            headers: {
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
        };
        axios
            .request(config)
            .then((response) => {
                const confirmation_url =
                    response.data.innerData.confirmation_url;
                window.open(confirmation_url, "_self");
            })
            .catch((error) => {
                setButtonText("Продлить");
                console.log(error);
            });
    }
    function logout(ev) {
        ev.preventDefault();
        localStorage.clear();
        window.open("https://atletikum.ru/", "_self");
    }
    const date = moment(user.expiration).format("ll");
    return (
        <div className="p-4 max-w-screen-lg m-auto mt-2 lg:mt-10 md:mt-10 sm:mt-10 pt-20">
            {!!user && (
                <div>
                    <div className="m-auto rounded-xl border-solid border-2 p-4 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs">
                        <div className="flex justify-center items-center">
                            <p className="flex items-center justify-center">
                                {user.expiration != null && (
                                    <label className="text-lg font-regular mr-3 price flex">
                                        {"Осталось "}
                                        {diffDays}
                                        {diffDays == 1 && "день"}
                                        {diffDays <= 4 && "дня"}
                                        {" дней"}
                                    </label>
                                )}
                                {user.expiration == null && (
                                    <label className="text-xl font-regular mr-3 price text-center">
                                        Нет активного абонемента
                                    </label>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="m-auto text-center">
                        <button
                            onClick={payment}
                            className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold my-5 text-base"
                        >
                            {buttonText}
                        </button>
                    </div>
                    <p className="text-center text-lg flex justify-center items-center mt-5 mb-5">
                        Стоимость продления:
                        <label className="font-regular text-xl ml-2">
                            {user.payment_amount + " ₽"}
                        </label>
                    </p>
                    <div className="flex justify-center items-center text-center m-auto py-10">
                        <button onClick={logout}>Выйти</button>
                    </div>
                </div>
            )}
            {!user && window.open("https://atletikum.ru/login", "_self")}
        </div>
    );
}
