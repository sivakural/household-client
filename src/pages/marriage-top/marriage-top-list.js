import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import GetPaths from "../../route";
import deleteimg from '../../delete.png';
import editimg from '../../edit.png'
import Notifications from "../../components/notifications";

export default function MarriageTopList(props) {
    const ths = ['S.No', 'Day', 'Village', 'Street', 'Name', 'Amount', 'Others', 'Action'];
    const { mtlist, mtdelete, ntlist, ntdelete, btlist, btdelete, ktlist, ktdelete, moiilist, moiidelete, searchurl } = GetPaths();
    const [search, setSearch] = useState(false);
    const [result, setResult] = useState([]);
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const [api, setApi] = useState({ list: null, delete: null })

    const { pathname } = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        if (pathname === '/marriage-top') { setApi({ list: mtlist, delete: mtdelete }) }
        if (pathname === '/natthi') { setApi({ list: ntlist, delete: ntdelete }) }
        if (pathname === '/bangle-top') { setApi({ list: btlist, delete: btdelete }) }
        if (pathname === '/kudipona-top') { setApi({ list: ktlist, delete: ktdelete }) }
        if (pathname === '/moii-list') { setApi({ list: moiilist, delete: moiidelete }) }
    }, [pathname]);

    useEffect(() => {
        if (!props.searchObj) return;

        // remove empty key from object
        let newObj = Object.fromEntries(Object.entries(props.searchObj).filter(([_, v]) => v != ''));

        // reset the result array
        setResult([]);

        fetch(searchurl, {
            method: 'post',
            body: JSON.stringify(newObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            if (res.res) {
                setSearch(true);
                res.result = res.result.sort((a, b) => {
                    return new Date(a.day) - new Date(b.day);
                })
                setResult(res.result);
                setNotification({ type: 1, message: 'Successfully getting list...' });
            } else {
                setNotification({ type: 0, message: 'Failed to get list...' + res.err });
            }
        }).catch(err => {
            setNotification({ type: 0, message: 'Failed to get list...' + err.status });
        })
    }, [props.searchObj])

    useEffect(() => {
        if (!api.list) return;

        // reset the result array
        setResult([]);

        fetch(api.list).then(res => res.json()).then(res => {
            if (res.res) {
                let resData = res.result;
                if (pathname === '/moii-list') {
                    resData = resData.sort((a, b) => {
                        return new Date(b.day) - new Date(a.day);
                    });
                }
                setResult(resData);
                setNotification({ type: 1, message: 'Successfully getting list...' });
            } else {
                setNotification({ type: 0, message: 'Failed to get list...' + res.err });
            }
        }).catch(err => {
            setNotification({ type: 0, message: 'Failed to get list...' + err.status });
        })
    }, [api.list]);

    const setActivateTab = (e, data) => {
        e.preventDefault();
        navigate('entry', { state: { obj: data } })
    }

    const deleteRow = (data, indexum) => {
        fetch(`${api.delete}/${data.id}`, {
            method: 'delete'
        }).then(res => res.json()).then(res => {
            if (res.res) {
                result.splice(indexum, 1);
                setResult([...result]);
                setNotification({ type: 1, message: 'Successfully removed the record...' });
            } else {
                setNotification({ type: 0, message: 'Failed to remove record...' + res.err });
            }
        }).catch(err => {
            setNotification({ type: 0, message: 'Failed to remove record...' + err.status });
        })
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {ths.map((tHead) => <th key={tHead.toString()}>{tHead}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => <tr style={{ backgroundColor: (item.type === 'moii' && search) ? '#94f694' : '' }} key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.day}</td>
                        <td>{item.village}</td>
                        <td style={{ textTransform: 'capitalize' }}>{item.street === 'Nothing' ? '' : item.street}</td>
                        <td>{item.name} {item.pattam === 'Nothing' ? '' : item.pattam}</td>
                        <td>Rs.{new Intl.NumberFormat('en-IN').format(item.amount)}</td>
                        <td>{item.gold} {item.others}</td>
                        <td>
                            {!search && <Link onClick={(event) => setActivateTab(event, item)}>
                                <img className="actions" src={editimg} />
                            </Link>}
                            {!search && <a style={{ cursor: 'pointer' }} onClick={() => deleteRow(item, index)}>
                                <img className="actions" src={deleteimg} />
                            </a>}
                            {search && item.type}
                        </td>
                    </tr>)}
                </tbody>
            </table>

            {notification.type >= 0 && <Notifications notification={notification} />}
        </>
    )
}