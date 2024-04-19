import { Link, Outlet } from 'react-router-dom';
import './navigation.css'

function Navlist(props) {
    return (
        <li>
            <Link to={props.list.routepath}>{props.list.comp}</Link>
        </li>
    )
}

export default function Navigation() {
    const pages = [
        { comp: 'Dashboard', routepath: '/' },
        { comp: 'Marriage Top', routepath: '/marriage-top' },
        { comp: 'Naatthi Top', routepath: '/natthi' },
        { comp: 'Bangle Top', routepath: '/bangle-top' },
        { comp: 'kudipona Top', routepath: '/kudipona-top' },
        { comp: 'Moii List', routepath: '/moii-list' },
        { comp: 'Search', routepath: '/search' }
    ];

    const lists = pages.map((page, index) => <Navlist key={index} list={page} />);
    return (
        <>
            <nav className='navbar'>
                <ul>{lists}</ul>
            </nav>

            <Outlet />
        </>
    )
}