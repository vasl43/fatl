import { data } from "../Data";
import { Link } from "react-router-dom";
import { useState } from "react";

function Card() {
    const [filteredTitle, setFilteredTitle] = useState("");
    const titles = [...new Set(data.map((item) => item.title))];

    const handleTitleFilterChange = (e) => {
        setFilteredTitle(e.target.value);
    };

    const filteredData = filteredTitle
        ? data.filter((item) => item.title === filteredTitle)
        : data;
    return (
        <div>
            <div className="p-4 max-w-screen-lg m-auto">
                <select
                    value={filteredTitle}
                    onChange={handleTitleFilterChange}
                    className="bg-transparent cursor-pointer outline-none border-none text-xl appearance-none "
                >
                    <option value="">Фильтр по секциям</option>
                    {titles.map((title) => (
                        <option key={title} value={title}>
                            {title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="p-4 max-w-screen-lg m-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 lg:gap-10 md:gap-10">
                {filteredData.map((item) => (
                    <div
                        className="cursor-pointer hover:scale-105 transition-transform duration-100"
                        key={item.id}
                    >
                        <Link to={`/card/${item.id}`}>
                            <img src={item.image} className="rounded-xl" />
                            <h2 className="mt-2 text-l font-bold">
                                {item.title}
                            </h2>
                            <p className="text-xs">{item.loc}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

function call() {
    window.open("tel:89990004300");
}

export default function IndexPage() {
    return (
        <div>
            <Card />
            <div className="pt-10 p-4 max-w-screen-lg m-auto text-center mb-20">
                <Link
                    to={"/privacy"}
                    className="cursor-pointer font-regular text-center text-xs mb-2"
                >
                    Политика обработки персональных данных
                    <br className="mb-2" />
                    2017 - 2024 Атлетикум. Все права защищены
                </Link>
                <p className="cursor-pointer font-regular text-center text-xs mt-2">
                    ИП Керимов Эльвир Адилович ИНН: 503817618530
                </p>
            </div>
            <div className="p-4 max-w-screen-lg flex justify-center items-center m-auto">
                <button
                    data-te-ripple-init
                    className="bg-black text-white rounded-xl fixed p-4 bottom-3 lg:w-[360px] md:w-[360px] sm:w-[360px] w-11/12 max-w-[400px] hover:bg-zinc-800"
                    onClick={call}
                >
                    Позвонить
                </button>
            </div>
        </div>
    );
}
