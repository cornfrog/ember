import { Link } from "react-router-dom";
import { EMBER_NAVBAR_LINKS } from "../utils/navbarLinks";
import "../assets/components/Navbar.scss";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const currentLocation = useLocation();

    const navbarLinks = EMBER_NAVBAR_LINKS.map((link) => {
        return (
            <Link
                key={link.linkKey}
                className="menu-link flex-align-center-justify-center gap-1r"
                to={link.linkTo}
            >
                <i
                    className={link.linkIcon}
                ></i>
                {link.linkText}
            </Link>
        )
    });

    const navigateToProjects = () => {
        if(currentLocation.pathname === "/setup") return
        navigate("/projects");
    }

    return (
        <div className="
            navbar 
            flex-align-center-justify-start 
            gap-5r

        ">
            <div className="flex-align-center-justify-start gap-1r">
                <i
                    className="logo-icon"
                ></i>
                <h1
                    className="nav-title"
                    onClick={navigateToProjects}
                >Ember</h1>
            </div>
            <div className={`
                ${currentLocation.pathname === "/setup" ? "hidden" : ""}
                menu 
                flex-align-center-justify-center 
                gap-1r
            `}>
                {navbarLinks}
            </div>
        </div>
    )
}

export default Navbar;