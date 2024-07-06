import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Notifications from "../../components/notifications";
import { validateObjInputs, handleAPICall } from '../util';
import GetPaths from "../../route";

export default function GeneralAdd() {
    const mandateKeys = ['date', 'thingsdone', 'amount'];
    const { infogenadd, infogenupdate } = GetPaths();
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const [inputs, setInputs] = useState({});
    const [disable, setDisable] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    useEffect(() => {
        if ('date' in inputs) setDisable(validateObjInputs(inputs, mandateKeys))
    }, [inputs])

    useEffect(() => {
        if (state?.obj) {
            setIsEdit(true);
            setInputs(state.obj);
        }
    }, [state]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        // remove empty key from object
        let newObj = Object.fromEntries(Object.entries(inputs).filter(([_, v]) => v != ('' || null)));

        handleAPICall('post', isEdit ? infogenupdate : infogenadd, null, newObj, null).then(res => {
            if (res.type) 
                navigate(-1);
            else setNotification(res);
        });
    }

    const resetData = () => {
        setInputs({});
        setDisable(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-20">
                        <label>Date <br />
                            <input type="date" name='date' id='date' value={inputs.date || ''} onChange={handleChange} disabled={isEdit} />
                        </label>
                    </div>
                    <div className="col-40">
                        <label>Things Done</label><br />
                        <input type="text" name="thingsdone" id="thingsdone" value={inputs.thingsdone || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                </div>

                <div className="row">
                    <div className="col-20">
                        <label>Amount </label><br />
                        <input type="number" name="amount" id="amount" value={inputs.amount || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                    <div className="col-40">
                        <label>Others</label><br />
                        <input type="text" name="others" id="others" value={inputs.others || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-40'>
                        <input type='submit' className={disable ? "disabled" : ''} />
                        <input type='reset' onClick={resetData} />
                    </div>
                </div>
            </form>

            {notification.type >= 0 && <Notifications notification={notification} />}
        </>
    )
}