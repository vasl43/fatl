import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

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

    return (
        <div className="p-4 max-w-screen-lg m-auto mt-28">
            <form
                action=""
                className="flex flex-col justify-center items-center"
            >
                <input
                    type="text"
                    required
                    placeholder="Имя"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs mb-2 font-bold"
                    onChange={(ev) => setName(ev.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Номер телефона"
                    className="p-3 border-2 border-black rounded-xl outline-none w-full lg:max-w-xs md:max-w-xs sm:max-w-xs font-bold"
                    value={phone}
                    onChange={phoneMask}
                    maxLength={11}
                />
                <button className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl mt-5 w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold">
                    Записаться
                </button>
                <Link
                    to={"/privacy"}
                    className="mt-4 cursor-pointer font-regular text-center text-xs"
                >
                    Нажимая кнопку "Записаться",
                    <br /> вы соглашаетесь с политокой обработки персональных
                    данных
                </Link>
            </form>
        </div>
    );
}
