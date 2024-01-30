import { useParams } from "react-router-dom";
import { data } from "../Data";
import { Link } from "react-router-dom";

function call() {
    window.open("tel:89990004300");
}

function Card() {
    const { id } = useParams();
    const product = data.find((product) => product.id === id);

    if (!product) {
        return <h3>Товар не найден!</h3>;
    }
    return (
        <div>
            <section className="p-4 max-w-screen-lg m-auto mt-2 lg:mt-10 md:mt-10 sm:mt-10">
                <div className="flex justify-start items-start gap-10 flex-col lg:flex-row md:flex-row sm:flex-col">
                    <div className="w-[100%] lg:w-[65%] md:w-[65%]">
                        <div className="flex flex-col mb-5">
                            <h2 className="text-4xl font-semibold mb-1">
                                {product.title}
                            </h2>
                            <p className="cursor-pointer">{product.location}</p>
                        </div>
                        <img
                            src={product.image}
                            className="w-full rounded-xl"
                        />
                    </div>
                    <div className="w-[100%] lg:w-[35%] md:w-[35%]">
                        <div className="flex flex-col">
                            <p className="text-4xl font-semibold mb-1">
                                {product.price} ₽
                            </p>
                            <p>в месяц</p>
                        </div>
                        <div className="flex justify-between my-5 gap-2">
                            <div className="text-center flex flex-col p-2 border-solid border-2 rounded-xl w-[122px]">
                                <p>{product.shed}</p>
                                <p>{product.shedTime}</p>
                            </div>
                            <div className="text-center flex flex-col p-2 border-solid border-2 rounded-xl w-[122px]">
                                <p>{product.shed2}</p>
                                <p>{product.shedTime2}</p>
                            </div>
                            {product.shed3 !== null && (
                                <div className="text-center flex flex-col p-2 border-solid border-2 rounded-xl w-[122px]">
                                    <p>{product.shed3}</p>
                                    <p>{product.shedTime3}</p>
                                </div>
                            )}
                        </div>
                        <p className="text-4xl font-bold">*</p>
                        <div className="text-zinc-500 pb-48 lg:pb-0 md:pb-0">
                            <p>
                                Возрастное ограничение:{" "}
                                <label>{product.ageLimit}</label>
                            </p>
                            <p className="my-2">
                                Продолжительность занятия:{" "}
                                <label>{product.duration}</label>
                            </p>
                            <p>
                                Скидка 500 ₽ для второго и последующих членов
                                семьи
                            </p>
                        </div>
                        <div className="w-[92%] fixed bottom-0 bg-white lg:static md:static lg:w-full md:w-full z-30 pb-5 pt-0">
                            <button
                                onClick={call}
                                className="border-solid border-2 border-black outline-none shadow-none text-black bg-transparent p-3 rounded-xl w-full my-5 mt-8"
                            >
                                Позвонить
                            </button>
                            <div className="w-full m-auto flex justify-center items-center">
                                <Link
                                    to="/order"
                                    className="hover:bg-zinc-800 bg-black shadow-none text-white p-4 rounded-xl border-none outline-none w-full text-center"
                                >
                                    Записаться на пробное занятие
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function CardPage() {
    return <Card />;
}
