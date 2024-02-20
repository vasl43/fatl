import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const user = JSON.parse(localStorage.getItem("user")) || null;

export default function AccountPage() {
    const [userData, setUserData] = useState([]);
    const [buttonText, setButtonText] = useState("Продлить");
    const [loading, setLoading] = useState(true);
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date();
    const secondDate = new Date(userData.expiration);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url:
                "https://test.isroil-holding.uz/api/user/" +
                JSON.parse(localStorage.getItem("user"))?.id,
            headers: {
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
            },
        };

        axios
            .request(config)
            .then((response) => {
                setLoading(true);
                setUserData(response.data.innerData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    async function payment(ev) {
        ev.preventDefault();
        setButtonText(
            <div className="flex justify-center items-center text-center">
                <p className="animate-spin text-2xl ">
                    <AiOutlineLoading3Quarters />
                </p>
            </div>
        );
        let config = {
            method: "post",
            url: "https://test.isroil-holding.uz/api/payment",
            headers: {
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
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
    return (
        <div className="p-4 max-w-screen-lg m-auto mt-2 lg:mt-10 md:mt-10 sm:mt-10 pt-20">
            {!!user && (
                <div>
                    <div className="m-auto rounded-xl border-solid border-2 p-4 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs">
                        <div className="flex justify-center items-center">
                            <p className="flex items-center justify-center">
                                {userData.expiration != null && (
                                    <label className="text-lg font-regular mr-3 price flex">
                                        {"Осталось "}
                                        {diffDays}
                                        {diffDays == 1 && "день"}
                                        {diffDays <= 4 && "дня"}
                                        {" дней"}
                                    </label>
                                )}
                                {userData.expiration == null && (
                                    <label className="text-xl font-regular mr-3 price text-center">
                                        {loading ? (
                                            <>Загрузка...</>
                                        ) : (
                                            <>Нет активного абонемента</>
                                        )}
                                    </label>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="m-auto text-center">
                        <button
                            onClick={payment}
                            className="border-none outline-none shadow-none text-white bg-black h-14 rounded-xl w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold my-5 text-base"
                        >
                            {buttonText}
                        </button>
                    </div>
                    <p className="text-center text-lg flex justify-center items-center mt-5 mb-5">
                        Стоимость продления:
                        <label className="font-regular text-xl ml-2">
                            {loading ? (
                                <>Загрузка...</>
                            ) : (
                                <>{userData.payment_amount + " ₽"}</>
                            )}
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
