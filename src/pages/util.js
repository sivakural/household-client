export function handleAPICall(type, api, listname, inputs, setResult) {
    return new Promise((resolve) => {
        fetch(api, handleHeaders(type, inputs)).then(res => res.json()).then(res => {
            if (res.res) {
                if (setResult)
                    setResult(res.result);
                resolve({ type: 1, message: "Successfully" + (listname?.includes("list") ? ` getting ${listname}` : ' Completed') + "..." });
            } else {
                resolve({ type: 0, message: 'Failed to ' + (listname?.includes("list") ? ` get list` : ' insert/update/delete record.') + res.err });
            }
        }).catch(err => {
            resolve({ type: 0, message: 'Failed to ' + (listname?.includes("list") ? ` get list` : ' insert/update/delete record.') + err.status });
        })
    });
}

const handleHeaders = (type, inputs) => {
    let obj = {};
    switch (type) {
        case 'post':
            obj.method = 'post';
            obj.body = JSON.stringify(inputs);
            obj.headers = { 'Content-Type': 'application/json' }
            break;
        case 'get':
            obj.method = 'get';
            break;
        case 'delete':
            obj.method = 'delete';
            break;
        default:
            obj.method = 'put';
            obj.body = JSON.stringify(inputs);
            obj.headers = { 'Content-Type': 'application/json' }
            break;
    }

    return obj;
}