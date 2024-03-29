import React, {useState} from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) =>
{
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    /* Used to update the whole object
   const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: ''
    });
    */

    /* Event Listeners */
    const titleChangeHandler = (event) =>
    {
        setEnteredTitle(event.target.value);
    };

    const categoryChangeHandler = (event) =>
    {
        setEnteredCategory(event.target.value);
    };

    const amountChangeHandler = (event) =>
    {
        setEnteredAmount(event.target.value);
    }

    const dateChangeHandler = (event) =>
    {
        setEnteredDate(event.target.value);
    }


    /* function to handle form submission */
    const submitHandler = (event) =>
    {
        event.preventDefault(); // prevent HTTP request

        /* create object to send to parent, NewExpense */
        const expenseData = {
            title: enteredTitle,
            category: enteredCategory,
            amount: +enteredAmount,
            date: new Date(enteredDate)
        };

        props.onSaveExpenseData(expenseData);
        //console.log(expenseData);

        /* clear form after submission */
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    }


    return <form onSubmit={submitHandler}>
        <div className='new-expense__controls'>
            <div className='new-expense__control'>
                <label>Expense Title*</label>
                <input type='text' value={enteredTitle} onChange={titleChangeHandler} placeholder='Shoes'/>
            </div>
            <div className='new-expense__control'>
                <label>Category*</label>
                <input type='text' value={enteredCategory} onChange={categoryChangeHandler} placeholder='Clothing'/>
            </div>
            <div className='new-expense__control'>
                <label>Amount ($)*</label>
                <input type='number' value={enteredAmount} onChange={amountChangeHandler} min="0.01" step="0.01" placeholder='$0.00'/>
            </div>
            <div className='new-expense__control'>
                <label>Date*</label>
                <input type='date' value={enteredDate} onChange={dateChangeHandler} min="2019-01-01" step="2022-12-22"/>
            </div>
        </div>
        <div className="closeBtn" />
        <div className="new-expense__actions">
            <button type="button" onClick={props.onCancel} >Cancel</button>
            <button type="submit">Add Expense</button>
        </div>
    </form>
}

export default ExpenseForm;
