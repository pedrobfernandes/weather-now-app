import { Logo } from "../icons/Logo";
import UnitsSelector from "./UnitsSelector";

import "./Header.css";


export default function Header()
{
    return(
        <header className="app-header">
            <Logo/>
            <UnitsSelector/>
        </header>
    );
}
