import ExpensesList from './ExpensesList';
import './NewComponentExpenses.css';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpensesChart from './ExpensesChart';
import ChartFilter from './ChartFilter';
import ChartList from './ChartList';
import PieChart from '../PieChart/PieChart';
import React, { useState, useEffect } from 'react';

const NewComponentExpenses = (props) => {

    const[filteredYear, setFilteredYear] = useState('2022'); // setting default year
    const[filteredChart, setFilteredChart] = useState('Bar'); // setting default chart
    const[currentCategories, setCurrentCategories] = useState(props.categories)


    const selectedNewYear = (selectedYear) =>
    {
        setFilteredYear(selectedYear);
    }
     const selectedNewChart = (selectedChart) =>
    {
        setFilteredChart(selectedChart);
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
                {<ChartFilter
                    selectedChart={filteredChart}
                    onSelectedNewChart={selectedNewChart}
                />}
                <ChartList chart={filteredChart} expenses={filteredExpenses} categories={props.categories}></ChartList>
                <ExpensesList items={filteredExpenses}/>
            </Card>
        </div>
    );
}
export default NewComponentExpenses;
