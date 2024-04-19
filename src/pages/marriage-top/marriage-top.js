import { Outlet, useLocation, useNavigate } from "react-router-dom";
import './marriage-top.css'

export default function MarriageTop() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const navigateToEntry = () => {
        navigate('entry')
    };

    const navigateToBack = () => {
        navigate(-1)
    };

    return (
        <>
            <div className="marriage-top">
                { pathname.includes('/entry') && <button className="back" onClick={navigateToBack}>Back</button> } 
                { !pathname.includes('/entry') && !pathname.includes('/search') && <button className="entry" onClick={navigateToEntry}>Entry</button> }

                <Outlet />
            </div>
        </>
    )
}