import addimg from '../../add.png';
import './activities.css';

export default function Activities() {
    const indexes = ['Labour', 'Nadavu'];

    const keyPress = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            console.log(e.target.value)
        }
    }

    const createTable = (e) => {
        let lable = document.createElement('label'),
        input = document.createElement('input'),
        parent = document.getElementById('content');
        lable.innerText = `Enter ${e} name: `;
        lable.className = 'label';input.type = 'text';input.name = e;input.id = e;input.className = 'form-input';
        input.onkeyup = (ev) => keyPress(ev);
        lable.appendChild(input);
        parent.appendChild(lable);
    }

    return (
        <>
            <div className='content' id='content'>
                <div className='content-txt'>Create Table
                    <img className='dropup' src={addimg} alt='add' width='20px' height='20px' />
                    <div className="dropup-content" id='dropupContent'>
                        {indexes.map((val, index) => <a style={{ cursor: 'pointer' }} key={index} onClick={() => createTable(val)}>{val}</a>)}
                    </div>
                </div>
            </div>
        </>
    )
}