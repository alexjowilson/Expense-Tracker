import ExpensesList from './ExpensesList';
import './NewComponentExpenses.css';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpensesChart from './ExpensesChart';
import PieChart from '../PieChart/PieChart'
import React, { useState, useEffect } from 'react';

const NewComponentExpenses = (props) => {

    const[filteredYear, setFilteredYear] = useState('2022'); // setting default year

    const selectedNewYear = (selectedYear) =>
    {
        setFilteredYear(selectedYear);
    }

    /* filter parent array based on year the user selects */
    const filteredExpenses = props.items.filter(expense =>{
        return expense.date.getFullYear().toString() === filteredYear;
    });

    return (
        <div>
            <Card className="expenses">
                <ExpenseFilter
                    selected={filteredYear}
                    onSelectedNewYear={selectedNewYear}
                />
              <PieChart expenses={props.categories}></PieChart>
                <ExpensesList items={filteredExpenses}/>
            </Card>
        </div>
    );
}
export default NewComponentExpenses;
