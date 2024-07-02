import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import './navigation.css'

function Navlist(props) {
    return (
        <li className={(props.currentRoute.pathname === props.list.routepath) || (props.currentRoute.pathname.includes(props.list.includes)) ? 'isactive' : ''}>
            <Link to={props.list.routepath}>{props.list.comp}</Link>
        </li>
    )
}

export default function Navigation({ to }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    const pages = [
        { comp: 'Dashboard', routepath: '/', includes: '/expenseadd' },
        { comp: 'Marriage Top', routepath: '/marriage-top', includes: '/marriage-top/entry' },
        { comp: 'Naatthi Top', routepath: '/natthi', includes: '/natthi/entry' },
        { comp: 'Bangle Top', routepath: '/bangle-top', includes: '/bangle-top/entry' },
        { comp: 'kudipona Top', routepath: '/kudipona-top', includes: '/kudipona-top/entry' },
        { comp: 'Moii List', routepath: '/moii-list', includes: '/moii-list/entry' },
        { comp: 'Activities', routepath: '/activities', includes: '/activities' },
        { comp: 'Info', routepath: '/info', includes: '/info' },
        { comp: 'Search', routepath: '/search', includes: '/search' }
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