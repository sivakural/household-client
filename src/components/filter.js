import { memo, useState } from 'react';
import { formatDate } from '../pages/util';
const FilterComponent = (props) => {
    const { categories, sendDataToParent, amounts } = props;
    const date = new Date();
    const today = formatDate(date);
    const [inputs, setInputs] = useState({ from: today, to: today });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleClick = () => {
        sendDataToParent(inputs);
    }

    const handleclear = () => {
        setInputs({ from: today, to: today });
        sendDataToParent({ clear: true });
    }

    return (
        <>
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'center' }}>
                <label style={{ marginLeft: '2rem', color: '#0452be', fontSize: '14px' }}>From &nbsp;
                    <input type="date" name='from' id='from' value={inputs.from || ''} onChange={handleChange} />
                </label>

                <label style={{ marginLeft: '2rem', color: '#0452be', fontSize: '14px' }}>To &nbsp;
                    <input type="date" name='to' id='to' value={inputs.to || ''} onChange={handleChange} />
                </label>

                <label style={{ marginLeft: '2rem', color: '#0452be', fontSize: '14px' }}>Categorey &nbsp;
                    <input type="text" name='categorey' id='categorey' list="categories" value={inputs.categorey || ''} onChange={handleChange} />
                    <datalist id="categories">
                        {categories.map((value, iter) => <option key={iter} value={value.categoreyName} />)}
                    </datalist>
                </label>

                <button className='filterbtns' onClick={handleClick}>Filter</button>

                <button className='filterbtns' onClick={handleclear}>Clear</button>

                {/* display amount of filter */}
                <span style={{ marginLeft: '1rem', transform: 'translate(10px, 17px)' }}>Rs.{new Intl.NumberFormat('en-IN').format(amounts)}</span>
            </div>
        </>
    )
}

export default memo(FilterComponent);