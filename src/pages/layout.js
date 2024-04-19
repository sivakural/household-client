// import FooterComponent from "../components/footer";
import HeaderComponent from "../components/header";
import Navigation from "../components/navigation";
import "./layout.css";

export default function Layout() {
    return (
        <>
            <div className="layout">
                <HeaderComponent />
                <Navigation />
            </div>
        </>
    )
}