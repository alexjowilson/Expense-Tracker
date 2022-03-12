import React from 'react';
import ExpensesChart from './ExpensesChart';
import PieChart from '../PieChart/PieChart';
import './ExpensesList.css';

const ChartList = props => {

    switch(props.chart){

        case "Bar":
            return(<ExpensesChart expenses={props.expenses}></ExpensesChart>)

        case "Pie":
              return(<PieChart expenses={props.categories}></PieChart>)

        default:
            return(<ExpensesChart expenses={props.expenses}></ExpensesChart>)

    }
}

export default ChartList;
