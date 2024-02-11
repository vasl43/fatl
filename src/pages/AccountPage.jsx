const user = JSON.parse(localStorage.getItem("user")) || null;
import axios from "axios";

export default function AccountPage() {
    async function payment(ev) {
        ev.preventDefault();
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
                const data2 = response.data;
                const confirmation_url = data2.innerData.confirmation_url;
                console.log(confirmation_url);
                window.open(confirmation_url, "_self");
            })
            .catch((error) => {
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
                        <div className="flex justify-between items-center">
                            <p>Действителен до:</p>
                            <p className="flex items-center justify-center">
                                <label className="text-4xl font-bold mr-3 price">
                                    {user.expiration}
                                </label>
                            </p>
                        </div>
                    </div>
                    <div className="m-auto text-center">
                        <button
                            onClick={payment}
                            className="hover:bg-zinc-800 border-none outline-none shadow-none text-white bg-black p-4 rounded-xl w-full lg:max-w-xs md:max-w-xs sm:max-w-xs transition duration-200 font-bold my-5"
                        >
                            Продлить
                        </button>
                    </div>
                    <p className="text-center text-xl flex justify-center items-center mt-5 mb-5">
                        Стоимость продления:
                        <label className="font-bold text-3xl ml-2">
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
