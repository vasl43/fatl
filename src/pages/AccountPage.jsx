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
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5MmMyNyIsImZ1bGxuYW1lIjoiT3liZWsgQWJkdWphYmJvcm92IiwiYnJpdGhkYXkiOiIxOTk2LTAzLTAzVDE5OjAwOjAwLjAwMFoiLCJwaG9uZSI6Iis5OTg5NTAyNzA0OTYiLCJwYXltZW50X2Ftb3VudCI6Mi4xNSwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiI4YzY5NzZlNWI1NDEwNDE1YmRlOTA4YmQ0ZGVlMTVkZmIxNjdhOWM4NzNmYzRiYjhhODFmNmYyYWI0NDhhOTE4IiwiZXhwaXJhdGlvbiI6IjIwMjQtMDMtMDhUMTk6MDA6MDAuMDAwWiIsImRlbGV0ZWRfYXQiOm51bGwsImpvaW5lZF9hdCI6IjIwMjQtMDItMDZUMTU6MDA6MTAuMDAwWiIsInVwZGF0ZWRfYXQiOm51bGwsImlhdCI6MTcwNzQ2Nzk5NCwiZXhwIjoxNzA3NTExMTk0fQ.BKI0r3dOUAu0C8Wt9V657TtixVxas0aqHkA5fbvj0c0",
            },
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <p className="text-center text-xl flex justify-center items-center mt-5">
                        Стоимость продления:
                        <label className="font-bold text-3xl ml-2">
                            {user.payment_amount + " ₽"}
                        </label>
                    </p>
                </div>
            )}
            {!user && window.open("https://atletikum.ru/login", "_self")}
        </div>
    );
}
