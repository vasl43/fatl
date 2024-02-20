import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminPage() {
    const [userData, setUserData] = useState([]);
    const [newPrice, setNewPrice] = useState(3500);
    const [newDate, setNewDate] = useState(0);
    useEffect(() => {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://test.isroil-holding.uz/api/user",
            headers: {
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
            },
        };
        axios
            .request(config)
            .then((response) => {
                setUserData(response.data.innerData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function logout(ev) {
        ev.preventDefault();
        localStorage.clear();
        window.open("https://atletikum.ru/", "_self");
    }

    function changePrice(user) {
        let data = JSON.stringify({
            payment_amount: Number(newPrice),
        });

        let config = {
            method: "patch",
            maxBodyLength: Infinity,
            url: "https://test.isroil-holding.uz/api/payment/user/" + user.id,
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
            data: data,
        };
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function changeExpiration(user) {
        let data = JSON.stringify({
            type: "add",
            day: Number(newDate),
        });

        let config = {
            method: "patch",
            maxBodyLength: Infinity,
            url:
                "https://test.isroil-holding.uz/api/user/change/expiration/" +
                user.id,
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="p-4 max-w-screen-lg m-auto ">
            <h2 className="text-xl text-center mt-20">Список клиентов</h2>
            <div className="flex justify-center items-center mt-5">
                <label className=" bg-zinc-200 p-4 rounded-xl rounded-r-none">
                    Новая цена:
                </label>
                <input
                    type="num"
                    className="bg-zinc-200 p-4 outline-none rounded-r-xl pl-0 w-[60px] mr-5"
                    placeholder="3500"
                    maxLength={4}
                    onChange={(ev) => setNewPrice(ev.target.value)}
                />
                <label className=" bg-zinc-200 p-4 rounded-xl rounded-r-none">
                    Добавить абонемент:
                </label>
                <input
                    type="num"
                    className="bg-zinc-200 p-4 outline-none rounded-r-xl pl-0 w-[60px]"
                    placeholder="0"
                    maxLength={4}
                    onChange={(ev) => setNewDate(ev.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center justify-center m-auto text-center mt-10 font-bold mb-5">
                <p>Ф.И.О</p>
                <p>Телефон</p>
                <p className="cursor-pointer">Абонемент</p>
                <p>Цена</p>
            </div>
            <div>
                {userData.map((user) => (
                    <div
                        key={user.id}
                        className="grid grid-cols-4 gap-4 items-center justify-center m-auto text-center py-2 border-b-2"
                    >
                        <div>
                            <p>{user.fullname}</p>
                        </div>
                        <div>
                            <p>{user.phone}</p>
                        </div>
                        <div className="">
                            {user.expiration == null ? (
                                <p className="bg-zinc-500 rounded-xl cursor-not-allowed">
                                    Н/А
                                </p>
                            ) : (
                                <div
                                    className="cursor-pointer"
                                    onClick={() => changeExpiration(user)}
                                >
                                    {Math.ceil(
                                        (new Date(user.expiration).getTime() -
                                            new Date().getTime()) /
                                            (1000 * 60 * 60 * 24)
                                    ) < 15 && (
                                        <p className="bg-yellow-500 rounded-xl">
                                            {Math.ceil(
                                                (new Date(
                                                    user.expiration
                                                ).getTime() -
                                                    new Date().getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            )}
                                        </p>
                                    )}
                                    {Math.ceil(
                                        (new Date(user.expiration).getTime() -
                                            new Date().getTime()) /
                                            (1000 * 60 * 60 * 24)
                                    ) > 15 && (
                                        <p className="bg-green-500 rounded-xl">
                                            {Math.ceil(
                                                (new Date(
                                                    user.expiration
                                                ).getTime() -
                                                    new Date().getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            )}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => changePrice(user)}
                        >
                            <p>{user.payment_amount}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center text-center m-auto py-10">
                <button onClick={logout}>Выйти</button>
            </div>
        </div>
    );
}
