import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import Dashboard from './pages/dashboard';
import ExpensesList from './pages/expenses/expenses-list';
import ExpsensesAdd from './pages/expenses/expenses-add';
import MarriageTopList from './pages/marriage-top/marriage-top-list';
import MarriageTop from './pages/marriage-top/marriage-top';
import MarriageTopEdit from './pages/marriage-top/marriage-top-edit';
import Search from './pages/search';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<Dashboard />}>
              <Route index element={<ExpensesList />} />
              <Route path='expenseadd' element={<ExpsensesAdd />} />
              <Route path='expenseadd/:id' element={<ExpsensesAdd />} />
            </Route>
            <Route path='/marriage-top' element={<MarriageTop />}>
              <Route index element={<MarriageTopList />} />
              <Route path='entry' element={<MarriageTopEdit />} />
              <Route path='entry/:id' element={<MarriageTopEdit />} />
            </Route>
            <Route path='/natthi' element={<MarriageTop />}>
              <Route index element={<MarriageTopList />} />
              <Route path='entry' element={<MarriageTopEdit />} />
              <Route path='entry/:id' element={<MarriageTopEdit />} />
            </Route>
            <Route path='/kudipona-top' element={<MarriageTop />}>
              <Route index element={<MarriageTopList />} />
              <Route path='entry' element={<MarriageTopEdit />} />
              <Route path='entry/:id' element={<MarriageTopEdit />} />
            </Route>
            <Route path='/bangle-top' element={<MarriageTop />}>
              <Route index element={<MarriageTopList />} />
              <Route path='entry' element={<MarriageTopEdit />} />
              <Route path='entry/:id' element={<MarriageTopEdit />} />
            </Route>
            <Route path='/moii-list' element={<MarriageTop />}>
              <Route index element={<MarriageTopList />} />
              <Route path='entry' element={<MarriageTopEdit />} />
              <Route path='entry/:id' element={<MarriageTopEdit />} />
            </Route>
            <Route path='/search' element={<MarriageTop />}>
              <Route index element={<Search />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
