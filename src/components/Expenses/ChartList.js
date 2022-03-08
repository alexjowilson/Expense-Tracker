import React from 'react';
import ExpensesChart from './ExpensesChart';
import './ExpensesList.css';

const ChartList = props => {

    switch(props.chart){

        case "Bar":
            return(<ExpensesChart expenses={props.expenses}></ExpensesChart>)
        
        case "Pie":
            break;

        default:
            return(<ExpensesChart expenses={props.expenses}></ExpensesChart>)
            
    }
}

export default ChartList;