import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return(
        <div className="font-sans min-h-screen flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}