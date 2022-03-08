import ExpensesList from './ExpensesList';
import './NewComponentExpenses.css';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpensesChart from './ExpensesChart';
import ChartList from './ChartList';
import React, { useState } from 'react';
import ChartFilter from './ChartFilter';

const NewComponentExpenses = (props) => {

    const[filteredChart, setFilteredChart] = useState('Bar'); // setting default year

    const selectedNewChart = (selectedChart) =>
    {
        setFilteredChart(selectedChart);
    }


    const[filteredYear, setFilteredYear] = useState('2022'); // setting default year

    const selectedNewYear = (selectedYear) =>
    {
        setFilteredYear(selectedYear);
    }

    /* filter parent array based on year the user selects */
    const filteredExpenses = props.items.filter(expense =>{
        console.log("filtered year is " + filteredYear);
        return expense.date.getFullYear().toString() === filteredYear;
    }); 

    return (
        <div>
            <Card className="expenses">
                <ExpenseFilter 
                    selected={filteredYear} 
                    onSelectedNewYear={selectedNewYear}
                /> 
                {<ChartFilter
                    selectedChart={filteredChart}
                    onSelectedNewChart={selectedNewChart}
                />}
                <ChartList chart={selectedNewChart} expenses={filteredExpenses}></ChartList>
                <ExpensesList items={filteredExpenses}/>
            </Card>
        </div>
    );
}
export default NewComponentExpenses;