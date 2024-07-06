import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetPaths from "../../route";
import { handleAPICall } from "../util";
import Notifications from "../../components/notifications";
import deleteimg from '../../delete.png';
import editimg from '../../edit.png';

export default function FormingTable() {
    const ths = ['S.No', 'Day', 'Season', 'Name', 'Bag/Kgs/Others', 'Rate', 'Amount', 'Others', 'Action'];
    const [result, setResult] = useState([]);
    const { infoformlist } = GetPaths();
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        handleAPICall('get', infoformlist, 'information list', null, setResult).then((res) => {
            setNotification(res);
        })
    }, [infoformlist])

    const setActivateTab = (e, data) => {
        e.preventDefault();
        navigate('entry', { state: { obj: data } })
    }

    const deleteRow = (data, indexum) => {
        setNotification({ type: 0, message: 'Does not have a permission to delete...' });
    }
    return (
        <>
            <table className="table info-table">
                <thead>
                    <tr>
                        {ths.map((tHead) => <th key={tHead.toString()}>{tHead}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {result.map((res, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{res.date}</td>
                        <td>{res.season}</td>
                        <td>{res.name}</td>
                        <td>{res.quantity}</td>
                        <td>{res.rate}</td>
                        <td>Rs.{new Intl.NumberFormat('en-IN').format(res.amount)}</td>
                        <td>{res.others}</td>
                        <td>
                            <Link onClick={(event) => setActivateTab(event, res)}>
                                <img className="actions" src={editimg} />
                            </Link>
                            <a style={{ cursor: 'pointer' }} onClick={() => deleteRow(res, index)}>
                                <img className="actions" src={deleteimg} />
                            </a>
                        </td>
                    </tr>)}
                </tbody>
            </table>

            {notification.type >= 0 && <Notifications notification={notification} />}
        </>
    )
}