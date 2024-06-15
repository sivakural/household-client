import { memo, useState } from 'react';
const FilterComponent = (props) => {
    const { categories, sendDataToParent } = props;
    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))}-${date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())}`;
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
            <div style={{ display: 'flex' }}>
                <label style={{ marginLeft: '2rem', color: '#0882eb', fontSize: '14px' }}>From <br />
                    <input type="date" name='from' id='from' value={inputs.from || ''} onChange={handleChange} />
                </label>

                <label style={{ marginLeft: '2rem', color: '#0882eb', fontSize: '14px' }}>To <br />
                    <input type="date" name='to' id='to' value={inputs.to || ''} onChange={handleChange} />
                </label>

                <label style={{ marginLeft: '2rem', color: '#0882eb', fontSize: '14px' }}>Categorey <br />
                    <input type="text" name='categorey' id='categorey' list="categories" value={inputs.categorey || ''} onChange={handleChange} />
                    <datalist id="categories">
                        {categories.map((value, iter) => <option key={iter} value={value.categoreyName} />)}
                    </datalist>
                </label>

                <button style={{
                    padding: '10px',
                    height: 'fit-content',
                    marginTop: '1rem',
                    marginLeft: '2rem',
                    backgroundColor: '#51a5ed',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={handleClick}>Filter</button>

                <button style={{
                    padding: '10px',
                    height: 'fit-content',
                    marginTop: '1rem',
                    marginLeft: '2rem',
                    backgroundColor: '#51a5ed',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={handleclear}>Clear</button>
            </div>
        </>
    )
}

export default memo(FilterComponent);