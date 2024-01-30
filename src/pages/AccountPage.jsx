import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";

export default function AccountPage() {
    const { user, setUser } = useContext(UserContext);

    async function logout() {
        await axios.post("/logout");
        setUser(null);
        window.open("/", "_self");
    }

    return (
        <div className="p-4 max-w-screen-lg m-auto mt-2 lg:mt-10 md:mt-10 sm:mt-10 pt-20">
            {!!user && (
                <div>
                    <div className="m-auto rounded-xl border-solid border-2 p-4 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs">
                        <div className="flex justify-between items-center">
                            <p>До конца абонемента:</p>
                            <p className="flex items-center justify-center">
                                <label className="text-4xl font-bold mr-3 price">
                                    {user.left}
                                </label>
                                дней
                            </p>
                        </div>
                    </div>
                    <div className="m-auto text-center">
                        {user.left !== 0 && (
                            <button className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold my-5">
                                Продлить
                            </button>
                        )}
                    </div>
                    <p className="text-center text-xl flex justify-center items-center mt-5">
                        Стоимость продления:
                        <label className="font-bold text-3xl ml-2">
                            {user.price + " ₽"}
                        </label>
                    </p>
                    <p
                        onClick={logout}
                        className="text-center cursor-pointer mt-10"
                    >
                        Выйти
                    </p>
                </div>
            )}
        </div>
    );
}
