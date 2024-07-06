import { useEffect, useState } from "react";
import './info.css';
import FormingTable from "./formingTable";
import GeneralTable from "./generalTable";
import { setTable, table } from "../util";

export default function Info() {
    const navs = ["Forming", "General"];
    const [nav, setNav] = useState(table);

    const setActivateNav = (e, val) => {
        e.preventDefault();
        setNav(val);
        setTable(val);
    }

    return (
        <>
            <div className="topNav">
                {navs.map((val, index) => <a key={index} className={val === nav ? 'active' : ''} onClick={(event) => setActivateNav(event, val)}>{val}</a>)}
            </div>
            { nav === "Forming" && <FormingTable /> }
            { nav === "General" && <GeneralTable /> }
        </>
    )
}