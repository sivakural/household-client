import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetPaths from "../../route";
import { handleAPICall } from "../util";
import Notifications from "../../components/notifications";
import deleteimg from '../../delete.png';
import editimg from '../../edit.png';

export default function GeneralTable() {
    const ths = ['S.No', 'Day', 'Thing done', 'Amount', 'Others', 'Action'];
    const [result, setResult] = useState([]);
    const { infogenlist } = GetPaths();
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        handleAPICall('get', infogenlist, 'general information list', null, setResult).then((res) => {
            setNotification(res);
        })
    }, [infogenlist])

    const setActivateTab = (e, data) => {
        e.preventDefault();
        navigate('entry', { state: { obj: data } })
    }

    const deleteRow = (data, indexum) => {
        setNotification({ type: 0, message: 'Does not have a permission to delete...' });
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {ths.map((tHead, index) => <th key={index}>{tHead}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {result.map((res, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{res.date}</td>
                        <td>{res.thingsdone}</td>
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