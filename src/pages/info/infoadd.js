import { useState } from 'react';
import FormingAdd from './formingadd';
import GeneralAdd from './generaladd';
import { table } from '../util';

export default function InfoAdd() {
    const [nav, setNav] = useState(table);

    return (
        <>
            { nav === 'Forming' &&  <FormingAdd /> }
            { nav === 'General' && <GeneralAdd /> }
        </>
    )
}