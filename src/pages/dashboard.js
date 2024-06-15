import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetPaths from "../route";
import SetPerson from './utils';
import './dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const { humans } = GetPaths();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        if (!humans) return;

        // reset the result array
        setPersons([]);

        fetch(humans).then(res => res.json()).then(res => {
            if (res.res) {
                setPersons(res.result);
                let person = res.result.find(person => person.name == "Appa");
                SetPerson(person);
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [humans]);

    const navigateToEntry = () => {
        navigate('expenseadd');
    };

    const navigateToBack = () => {
        navigate(-1)
    };

    const changeHandler = (e) => {
        console.log(e);
        let person = persons.find(person => person.name == e.target.value);
        SetPerson(person);
    }

    return (
        <>
            <div className="dashboard">
                <select className='persons' id='persons' name='persons' onChange={(e) => changeHandler(e)}>
                    {persons.map((person) => <option key={person.personID} value={person.name}>{person.name}</option>)}
                </select>

                {pathname.includes('/expenseadd') && <button className="back" onClick={navigateToBack}>Back</button>}
                {!pathname.includes('/expenseadd') && <button className="entry" onClick={navigateToEntry}>Entry</button>}

                <Outlet />
            </div>
        </>
    )
}