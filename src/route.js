export default function GetPaths() {
    const hostURL = 'http://localhost:8080';
    const paths = {
        vlist: hostURL + '/list/vlist',
        slist: hostURL + '/list/slist',
        plist: hostURL + '/list/plist',
        humans: hostURL + '/list/persons',
        categories: hostURL + '/list/categorey',
        expenselist: hostURL + '/expenses/list',
        expenseentry: hostURL + '/expenses/entry',
        expenseget: hostURL + '/expenses/listwithdate',
        expenseupdate: hostURL + '/expenses/update',
        mtlist: hostURL + '/marriage-top/list',
        mtentry: hostURL + '/marriage-top/entry',
        mtupdate: hostURL + '/marriage-top/update',
        mtdelete: hostURL + '/marriage-top/delete',
        ntlist: hostURL + '/natthi/list',
        ntentry: hostURL + '/natthi/entry',
        ntupdate: hostURL + '/natthi/update',
        ntdelete: hostURL + '/natthi/delete',
        ktlist: hostURL + '/kudipona-top/list',
        ktentry: hostURL + '/kudipona-top/entry',
        ktupdate: hostURL + '/kudipona-top/update',
        ktdelete: hostURL + '/kudipona-top/delete',
        btlist: hostURL + '/bangle-top/list',
        btentry: hostURL + '/bangle-top/entry',
        btupdate: hostURL + '/bangle-top/update',
        btdelete: hostURL + '/bangle-top/delete',
        moiilist: hostURL + '/moii/list',
        moiientry: hostURL + '/moii/entry',
        moiiupdate: hostURL + '/moii/update',
        moiidelete: hostURL + '/moii/delete',
        searchurl: hostURL + '/search/all',
        expensesearch: hostURL + '/search/expense'
    }

    return paths;
}