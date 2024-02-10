import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
const user = JSON.parse(localStorage.getItem("user")) || null;

export default function Header() {
    return (
        <header className="max-w-screen-lg m-auto flex justify-between p-4 pt-8 z-50 bg-white">
            <div className="size-8">
                <Link to={"/"} className="size-8">
                    <img src="/logo.png" alt="Логотип" />
                </Link>
            </div>

            <div className="flex gap-2 items-center cursor-pointer">
                {!!user && (
                    <Link to={"/account"}>
                        <div className="font-bold text-lg flex items-center">
                            {user.fullname.split(" ")[0]}
                            <FaUser className="size-7 text-black ml-2" />
                        </div>
                    </Link>
                )}
                {!user && (
                    <Link to={"/login"}>
                        <FaUser className="size-7 text-black" />
                    </Link>
                )}
            </div>
        </header>
    );
}
