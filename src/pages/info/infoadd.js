import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notifications from "../../components/notifications";
import { validateObjInputs, handleAPICall } from '../util';
import GetPaths from "../../route";

export default function InfoAdd() {
    const seasons = [
        { seasonID: 1, seasonname: 'Kuruvai(June-Jul)', duration: '<120' },
        { seasonID: 2, seasonname: 'Samba(Aug)', duration: '130-135 and >150' },
        { seasonID: 3, seasonname: 'Thaladi(Oct-Nov)', duration: '115-120' },
        { seasonID: 4, seasonname: 'Kodai(Mar-Jun)', duration: '>120' },
        { seasonID: 5, seasonname: 'Others', duration: 'All months' }
    ]
    const mandateKeys = ['date', 'season', 'name', 'quantity', 'amount'];
    const { infoadd } = GetPaths();
    const [notification, setNotification] = useState({ type: -1, message: '' });
    const [inputs, setInputs] = useState({});
    const [disable, setDisable] = useState(true);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    useEffect(() => {
        if ('date' in inputs) setDisable(validateObjInputs(inputs, mandateKeys))
    }, [inputs])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        handleAPICall('post', infoadd, null, inputs, null).then(res => {
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
                            <input type="date" name='date' id='date' value={inputs.date || ''} onChange={handleChange} disabled={false} />
                        </label>
                    </div>
                    <div className="col-40">
                        <label>Season </label><br />
                        <input type="text" name="season" id="season" list="seasons" value={inputs.season || ''} onChange={handleChange} autoComplete='off' />
                        <datalist id="seasons">
                            {seasons && seasons.map((season) => <option key={season.seasonID} value={season.seasonname} />)}
                        </datalist>
                    </div>
                    <div className="col-40">
                        <label>Name</label><br />
                        <input type="text" name="name" id="name" value={inputs.name || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                </div>

                <div className="row">
                    <div className="col-40">
                        <label>Bags/Kgs/Others</label><br />
                        <input type="text" name="quantity" id="quantity" value={inputs.quantity || ''} onChange={handleChange} />
                    </div>
                    <div className="col-40">
                        <label>Rate <br />
                            <input type="text" id='rate' name='rate' value={inputs.rate || ''} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="col-20">
                        <label>Amount </label><br />
                        <input type="number" name="amount" id="amount" value={inputs.amount || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                </div>

                <div className="row">
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