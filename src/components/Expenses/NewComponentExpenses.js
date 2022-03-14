import ExpensesList from './ExpensesList';
import './NewComponentExpenses.css';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpensesChart from './ExpensesChart';
import ChartFilter from './ChartFilter';
import ChartList from './ChartList';
import React, { useState, useEffect } from 'react';

const NewComponentExpenses = (props) => {

    const[filteredYear, setFilteredYear] = useState('2022'); // setting default year
    const[filteredChart, setFilteredChart] = useState('Bar'); // setting default chart
    const[filteredCategories, setFilteredCategories] = useState(props.categories)


    const selectedNewYear = (selectedYear) =>
    {
        setFilteredYear(selectedYear);
    }
     const selectedNewChart = (selectedChart) =>
    {
        setFilteredChart(selectedChart);
    }

    useEffect(() => {
      setCategories(filteredExpenses)
    }, [filteredYear, props.addExpense]);

    /* filter parent array based on year the user selects */
    const filteredExpenses = props.items.filter(expense =>{
        return expense.date.getFullYear().toString() === filteredYear;
    });
  //sets new categories based on expenses list
  function setCategories(expenses) {
    let newCategories = []
    const vals = expenses.map(expense => expense.category)
    vals.forEach((item) => {
      if(!newCategories.map(category => category.name).includes(item)) {
        newCategories.push({name:item, total:0})
      } });
    newCategories.forEach(props.recalculateTotals)
    setFilteredCategories(newCategories)
    }

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
                <ChartList chart={filteredChart} expenses={filteredExpenses} categories={filteredCategories}></ChartList>
                <ExpensesList items={filteredExpenses}/>
            </Card>
        </div>
    );
}
export default NewComponentExpenses;
