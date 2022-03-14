import React, { Fragment, useState, useContext } from 'react';
import NewComponentExpenses from './components/Expenses/NewComponentExpenses';
import NewExpense from './components/NewExpense/NewExpense';
import AuthContext from './store/auth-context';
import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';

/* Dummy expenses */
const DUMMY_EXPENSES = [
  { id: 'e1', title: 'FuboTV', category: 'Entertainment', amount: 33.01, date: new Date(2021, 12, 14) },
  { id: 'e2', title: 'Xbox Game Pass', category: 'Entertainment', amount: 16.54, date: new Date(2021, 12, 22) },
  { id: 'e3', title: 'Xfinity WiFi', category: 'Utilites', amount: 84.99, date: new Date(2020, 11, 1) },
  { id: 'e4', title: 'Apple News', category: 'Entertainment', amount: 5.00, date: new Date(2021, 11, 11) },
  { id: 'e5', title: 'Rent', category: 'Housing', amount: 1200, date: new Date(2022, 0, 1) },
  { id: 'e6', title: 'Xbox Game Pass', category: 'Entertainment', amount: 16.54, date: new Date(2022, 1, 22) },
  { id: 'e7', title: 'FuboTV', category: 'Entertainment', amount: 33.01, date: new Date(2022, 2, 14) },
];
const DUMMY_CATEGORIES = [{name: 'Entertainment', total: 0},
                          {name: 'Housing', total:0},
                          {name: 'Utilites', total:0}]
const App = () => {
  const[expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const[categories, setCategories] = useState(DUMMY_CATEGORIES)
  categories.forEach(gatherTotals);
// totals the category values into the category object
function gatherTotals(category) {
  category.total = 0
  const filteredExpenses = expenses.filter(expense =>{
  return expense.category.toString() === category.name;
  });
  const vals = filteredExpenses.map(expense => expense.amount)
  vals.forEach((item) => {
    category.total += item;
  });
}
  const context = useContext(AuthContext);


  /* function to handle when the user adds in a new expense */
  const addExpenseHandler = expense => {

    /* add the new expense and copy all existing expenses */
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses]
    });

    //when new category is added, update category totals
    if(!categories.map(category => category.name).includes(expense.category)) {
      setCategories((prevCategories) => {
        let newElements = [{ name:expense.category, total:0}, ...prevCategories]
        newElements.forEach(gatherTotals)
        return newElements
    });
    }
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
                <NewComponentExpenses items={expenses} categories={categories} recalculateTotals={gatherTotals}></NewComponentExpenses>
              </Fragment>
          }
        </main>
      </Fragment>
  );
}
export default App;
