import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import './navigation.css'

function Navlist(props) {
    return (
        <li className={(props.currentRoute.pathname === props.list.routepath) ? 'isactive' : ''}>
            <Link to={props.list.routepath}>{props.list.comp}</Link>
        </li>
    )
}

export default function Navigation({ to }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    const pages = [
        { comp: 'Dashboard', routepath: '/' },
        { comp: 'Marriage Top', routepath: '/marriage-top' },
        { comp: 'Naatthi Top', routepath: '/natthi' },
        { comp: 'Bangle Top', routepath: '/bangle-top' },
        { comp: 'kudipona Top', routepath: '/kudipona-top' },
        { comp: 'Moii List', routepath: '/moii-list' },
        { comp: 'Search', routepath: '/search' }
    ];

    const lists = pages.map((page, index) => <Navlist key={index} list={page} currentRoute={match} />);
    return (
        <>
            <nav className='navbar'>
                <ul>{lists}</ul>
            </nav>

            <Outlet />
        </>
    )
}