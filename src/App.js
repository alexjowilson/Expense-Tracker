import React, { Fragment, useState, useContext } from 'react';
import NewComponentExpenses from './components/Expenses/NewComponentExpenses';
import NewExpense from './components/NewExpense/NewExpense';
import AuthContext from './store/auth-context';
import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';

/* Dummy expenses */
const DUMMY_EXPENSES = [
  { id: 'e1', title: 'FuboTV', amount: 33.01, date: new Date(2021, 12, 14) },
  { id: 'e2', title: 'Xbox Game Pass', amount: 16.54, date: new Date(2021, 12, 22) },
  { id: 'e3', title: 'Xfinity WiFi', amount: 84.99, date: new Date(2020, 11, 1) },
  { id: 'e4', title: 'Apple News', amount: 5.00, date: new Date(2021, 11, 11) },
  { id: 'e5', title: 'Rent', amount: 1200, date: new Date(2022, 0, 1) },
  { id: 'e6', title: 'Xbox Game Pass', amount: 16.54, date: new Date(2022, 1, 22) },
  { id: 'e7', title: 'FuboTV', amount: 33.01, date: new Date(2022, 2, 14) },
];

const App = () => {
  const[expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const context = useContext(AuthContext);


  /* function to handle when the user adds in a new expense */
  const addExpenseHandler = expense => {

    /* add the new expense and copy all existing expenses */
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses]
    });
  };


  /* modern and easier way to create component */
  return (

      <Fragment>
        <MainHeader/>
        <main>
          {!context.isLoggedIn && <Login/>}
          {context.isLoggedIn && 
              <Fragment>
                <NewExpense onAppExpense={addExpenseHandler}/>
                <NewComponentExpenses items={expenses}></NewComponentExpenses> 
              </Fragment>
          }
        </main>
      </Fragment>
  );
}
export default App;
