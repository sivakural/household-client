import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './expense.css';
import SetPerson from '../utils';
import GetPaths from "../../route";
import Notifications from "../../components/notifications";
import editimg from '../../edit.png'
import FilterComponent from '../../components/filter';
import { handleAPICall } from '../util';

export default function ExpensesList() {
    const ths = ['S.No', 'Day', 'Categorey', 'Done', 'Amount', 'Action'];
    const [result, setResult] = useState([]);
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const { expenselist, categories, expensesearch } = GetPaths();
    const [person, setPerson] = useState({});
    const [category, setCategory] = useState([]);
    const [dataFromChild, setDataFromChild] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        SetPerson(null, getPerson);
        handleAPICall('get', categories, 'categories list', null, setCategory).then((res) => {
            setNotification(res);
        });
    }, [])

    const getExpenseList = () => {
        handleAPICall('get', `${expenselist}/${person.personID}`, 'expense list', null, setResult).then(res => {
            setNotification(res);
        });
    }

    useEffect(() => {
        if (!person?.personID) return;
        getExpenseList();
    }, [person?.personID]);

    useEffect(() => {
        if (dataFromChild.hasOwnProperty('from')) {
            if (dataFromChild.from || dataFromChild.to || dataFromChild.categorey) {
                dataFromChild.personID = person.personID;
                handleAPICall('post', expensesearch, 'expense list', dataFromChild, setResult).then(res => {
                    setNotification(res);
                });
            }
        } else if (dataFromChild.clear){
            getExpenseList();
        }
    }, [dataFromChild])

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

    const handleDataFromChild = (data) => {
        setDataFromChild(data);
    }

    return (
        <>
            {/* setting filter base */}
            <FilterComponent categories={category} sendDataToParent={handleDataFromChild} />

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
                                <Link style={{ verticalAlign: '-webkit-baseline-middle' }} onClick={(event) => setActivateTab(event, data)}>
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