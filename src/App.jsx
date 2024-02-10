import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import Privacy from "./pages/Privacy";
import CardPage from "./pages/CardPage";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "https://test.isroil-holding.uz";
axios.defaults.withCredentials = true;

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/card/:id" element={<CardPage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/account" element={<AccountPage />} />
            </Route>
        </Routes>
    );
}

export default App;
