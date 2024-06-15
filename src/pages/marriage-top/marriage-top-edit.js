import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './edit.css'
import GetPaths from '../../route';
import MarriageTopList from './marriage-top-list';
import Notifications from "../../components/notifications";

export default function MarriageTopEdit() {
    const [mt, setMt] = useState(false);
    const [nt, setNt] = useState(false);
    const [bt, setBt] = useState(false);
    const [kt, setKt] = useState(false);
    const [moii, setMoii] = useState(false);
    const [search, setSearch] = useState(false);
    const [clicksearch, setclicksearch] = useState(false);
    const [dateDisable, setDateDisable] = useState(true);

    const [inputs, setInputs] = useState({});

    const [villages, setVillages] = useState([]);
    const [pattams, setPattams] = useState([]);
    const [streets, setStreets] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [searchValues, setSearchValues] = useState({});
    const [notification, setNotification] = useState({ type: -1, message: '' });

    const { state, pathname } = useLocation();

    const navigate = useNavigate();

    const { mtentry, mtupdate, plist, slist, vlist, ntentry, ntupdate, btentry, btupdate, ktentry, ktupdate, moiientry, moiiupdate } = GetPaths();

    useEffect(() => {
        if (state && state.obj) {
            setInputs(state.obj);
            setIsEdit(true);
        }
    }, [state]);

    useEffect(() => {
        if (pathname.includes('/marriage-top/')) { setMt(true); setDateDisable(true) }
        else if (pathname.includes('/natthi/')) { setNt(true); setDateDisable(true) }
        else if (pathname.includes('/bangle-top/')) { setBt(true); setDateDisable(true) }
        else if (pathname.includes('/kudipona-top/')) { setKt(true); setDateDisable(true) }
        else if (pathname.includes('/moii-list/')) { setMoii(true); setDateDisable(false) }
        else { setSearch(true); };

        Promise.all([
            fetch(vlist).then(res => res.json()),
            fetch(plist).then(res => res.json()),
            fetch(slist).then(res => res.json())
        ]).then(([vItems, pItems, sItems]) => {
            if (vItems.res) {
                setVillages(vItems.result);
            }
            if (pItems.res) {
                setPattams(pItems.result);
            }
            if (sItems.res) {
                setStreets(sItems.result);
            }
        }, err => console.log)
    }, [pathname])

    useEffect(() => {
        getDate();
    }, [mt, nt, bt, kt])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const getDate = () => {
        if (isEdit) return;
        if (mt) setInputs({ day: '2021-08-20' })
        else if (nt) setInputs({ day: '2021-08-20' })
        else if (bt) setInputs({ day: '2023-05-25' })
        else if (kt) setInputs({ day: '2021-03-14' })
        else if (search || moii) setInputs({})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        if (search) {
            setclicksearch(true)
            setSearchValues(inputs);
            return;
        }
        let api;
        if (mt) { api = isEdit ? mtupdate : mtentry }
        else if (nt) { api = isEdit ? ntupdate : ntentry }
        else if (bt) { api = isEdit ? btupdate : btentry }
        else if (kt) { api = isEdit ? ktupdate : ktentry }
        else if (moii) { api = isEdit ? moiiupdate : moiientry }
        handleAPICall(api);
    }

    const resetData = () => {
        getDate();
    }

    const handleAPICall = (api) => {
        fetch(api, {
            method: 'post',
            body: JSON.stringify(inputs),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            if (res.res) {
                if (!isEdit) getDate()
                else navigate(-1);
            } else {
                setNotification({ type: 0, message: 'Failed to insert/update record...' });
            }
        }).catch(err => {
            setNotification({ type: 0, message: 'Failed to insert/update record...' });
        });
        setNotification({type: -1, message: ''});
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {(mt || nt || bt || kt || moii) &&
                        <div className="col-20">
                            <label>Date <br />
                                <input type="date" name='day' id='day' value={inputs.day || ''} onChange={handleChange} disabled={dateDisable} />
                            </label>
                        </div>
                    }
                    <div className="col-40">
                        <label>Village </label><br />
                        <input type="text" name="village" id="village" list="villages" value={inputs.village || ''} onChange={handleChange} autoComplete='off' />
                        <datalist id="villages">
                            {villages && villages.map((village) => <option key={village.villageID} value={village.villagename} />)}
                        </datalist>
                    </div>
                    <div className="col-40">
                        <label>Street</label><br />
                        <input type="street" name="street" id="street" list="streets" value={inputs.street || ''} onChange={handleChange} autoComplete='off' />
                        <datalist id="streets">
                            {streets && streets.map((street) => <option key={street.streetID} value={street.streetname} />)}
                        </datalist>
                    </div>
                </div>

                <div className="row">
                    <div className="col-40">
                        <label>Name </label><br />
                        <input type="text" name="name" id="name" value={inputs.name || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                    <div className="col-40">
                        <label>Pattam</label><br />
                        <input type="text" name="pattam" id="pattam" list="pattams" value={inputs.pattam || ''} onChange={handleChange} />
                        <datalist id="pattams">
                            {pattams && pattams.map((pattam) => <option key={pattam.pattamID} value={pattam.pattamname} />)}
                        </datalist>
                    </div>
                    <div className="col-20">
                        <label>Amount <br />
                            <input type="number" id='amount' name='amount' value={inputs.amount || ''} onChange={handleChange} />
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-40">
                        <label>Gold </label><br />
                        <input type="text" name="gold" id="gold" value={inputs.gold || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                    <div className="col-40">
                        <label>Others</label><br />
                        <input type="text" name="others" id="others" value={inputs.others || ''} onChange={handleChange} autoComplete='off' />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-40'>
                        <input type='submit' />
                        <input type='reset' onClick={resetData} />
                    </div>
                </div>
            </form>

            {clicksearch && <MarriageTopList searchObj={searchValues} />}
            {notification.type >= 0 && <Notifications notification={notification} />}
        </>
    )
}