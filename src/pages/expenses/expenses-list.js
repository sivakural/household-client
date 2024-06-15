import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './expense.css';
import SetPerson from '../utils';
import GetPaths from "../../route";
import Notifications from "../../components/notifications";
import editimg from '../../edit.png'

export default function ExpensesList() {
    const ths = ['S.No', 'Day', 'Categorey', 'Done', 'Amount', 'Action'];
    const [result, setResult] = useState([]);
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const { expenselist } = GetPaths();
    const [person, setPerson] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        SetPerson(null, getPerson);
    }, [])

    useEffect(() => {
        if (!person?.personID) return;

        fetch(`${expenselist}/${person.personID}`, {
            method: 'get'
        }).then(res => res.json()).then(res => {
            if (res.res) {
                console.log(res.result);
                setResult(res.result);
                setNotification({ type: 1, message: 'Successfully getting expense list...' });
            } else {
                setNotification({ type: 0, message: 'Failed to get list...' + res.err });
            }
        }).catch(err => {
            setNotification({ type: 0, message: 'Failed to get list...' + err.status });
        })
    }, [person?.personID]);

    const getPerson = (person) => {
        console.log("person: ", person);
        if (person.personID) {
            setPerson(person)
        }
    }

    const setActivateTab = (e, data) => {
        e.preventDefault();
        let sendingData = {
            date: data.date,
            personID: data.personID
        }
        navigate('expenseadd', { state: { obj: sendingData } })
    }

    return (
        <>
            <table className="expenselistTable table">
                <thead>
                    <tr>
                        {ths.map((tHead) => <th key={tHead.toString()}>{tHead}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {result.map((data, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.date}</td>
                            <td style={{ flex: '0 0 77%' }} colSpan='3'>
                                <table className='inner-table'>
                                    <tbody>
                                        {data.expenses.map((innerData, indexum) =>
                                            <tr key={index + '_' + indexum}>
                                                <td>{innerData.categorey}</td>
                                                <td>{innerData.expense}</td>
                                                <td>Rs.{new Intl.NumberFormat('en-IN').format(innerData.amount)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </td>
                            <td style={{ flex: '0 0 10%', maxWidth: '10%', display: 'inline-flex', alignItems: 'center' }}>
                                <Link style={{ verticalAlign: '-webkit-baseline-middle'}} onClick={(event) => setActivateTab(event, data)}>
                                    <img className="actions" src={editimg} />
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {notification.type >= 0 && <Notifications notification={notification} />}
        </>
    )
}