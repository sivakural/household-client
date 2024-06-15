import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SetPerson from '../utils';
import addimg from '../../add.png';
import deleteimg from '../../delete.png';
import GetPaths from "../../route";
import Notifications from "../../components/notifications";
import './expenseadd.css';

export default function ExpsensesAdd() {
    const ths = ['S.No', 'Day', 'Categorey', 'Done', 'Amount', 'Action'];
    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))}-${date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())}`;
    console.log(today);

    const [inputs, setInputs] = useState([]);
    const [category, setCategory] = useState([]);
    const [person, setPerson] = useState({});
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const [isEdit, setIsEdit] = useState(false);

    const { state } = useLocation();
    const { expenseentry, expenseget, categories, expenseupdate } = GetPaths();
    const navigate = useNavigate();

    useEffect(() => {
        SetPerson(null, getPerson);
        fetch(categories, {
            method: 'get'
        }).then(res => res.json()).then(res => {
            if (res.res) {
                setCategory(res.result);
                setNotification({ type: 1, message: 'Successfully getting categories list...' });
            } else {
                setNotification({ type: 0, message: 'Failed to get list...' + res.err });
            }
        }).catch(err => {
            setNotification({ type: 0, message: 'Failed to get list...' + err.status });
        })
    }, [])

    useEffect(() => {
        if (state?.obj) {
            setIsEdit(true);
            let inputs = state.obj;
            fetch(expenseget, {
                method: 'post',
                body: JSON.stringify(inputs),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                if (res.res) {
                    console.log(res.result);
                    setInputs([...res.result]);
                } else {
                    setNotification({ type: 0, message: 'Failed to insert/update record...' });
                }
            }).catch(err => {
                setNotification({ type: 0, message: 'Failed to insert/update record...' });
            });
        }
    }, [state]);

    useEffect(() => {
        if (!person?.name) return;
        setInputs([{date: today, categorey: '', expense: '', amount: 0, personID: person.personID }]);
    }, [person])

    const changeHandler = (index) => event => {
        const { name, value } = event.target;
        setInputs(input => input.map((el, indexum) => index === indexum ?
            {
                ...el,
                [name]: value,
            }
            : el,
        ));
    };

    const getPerson = (person) => {
        console.log("person: ", person);
        setPerson(person);
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(inputs);
        fetch(isEdit ? expenseupdate : expenseentry, {
            method: 'post',
            body: JSON.stringify(inputs),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            if (res.res) {
                navigate(-1);
            } else {
                setNotification({ type: 0, message: 'Failed to insert/update record...' });
            }
        }).catch(err => {
            setNotification({ type: 0, message: 'Failed to insert/update record...' });
        });
        setNotification({type: -1, message: ''});
    }

    const deleteRow = (index) => {
        const tempRows = [...inputs]; // to avoid  direct state mutation
        tempRows.splice(index, 1);
        setInputs(tempRows);
    }

    const add = () => {
        console.log("Add row");
        const row = { date: today, categorey: '', expense: '', amount: 0, personID: person.personID };
        setInputs([...inputs, row]);
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <table className="expenseaddTable">
                    <thead>
                        <tr>
                            {ths.map((tHead) => <th key={tHead.toString()}>{tHead}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {inputs.map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input type="date" name="date" id="date" value={x.date || ''} onChange={(e) => changeHandler(index)(e)} />
                                </td>
                                <td>
                                    <input className="categorey" type="text" name="categorey" id={`categorey${index}`} list="categories" value={x.categorey || ''} onChange={(e) => changeHandler(index)(e)} autoComplete='off' />
                                    <datalist id="categories">
                                        {category.map((value, iter) => <option key={ index + '_' + iter } value={value.categoreyName} />)}
                                    </datalist>
                                </td>
                                <td>
                                    <input className="done" type="text" name="expense" id={`expense${index}`} value={x.expense || ''} autoComplete='off' onChange={(e) => changeHandler(index)(e)} />
                                </td>
                                <td>
                                    <input className="amount" type="number" name="amount" id={`amount${index}`} value={x.amount || ''} autoComplete='off' onChange={(e) => changeHandler(index)(e)} />
                                </td>
                                <td>
                                    {!isEdit && <a style={{ cursor: 'pointer' }} onClick={add}>
                                        <img style={{ height: '34px', width: '34px' }} className="actions" src={addimg} />
                                    </a>}
                                    {((inputs.length > 1) && !isEdit) && <a style={{ cursor: 'pointer' }} onClick={() => deleteRow(index)}>
                                        <img style={{ marginBottom: '0.3rem', height: '20px', width: '20px' }} className="actions" src={deleteimg} />
                                    </a>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <input className='submitBtn' type="submit" value="Submit" />
            </form>

            {notification.type >= 0 && <Notifications notification={notification} />}
        </>
    )
}