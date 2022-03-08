import React from 'react';

import './ChartFilter.css';

const ChartFilter = (props) => {


    /* function to handle when user chooses a year in drop-down list */
    /* send it to NewComponentExpenses.js */
    const handleDropDownChange = (event) =>
    {

        props.onSelectedNewChart(event.target.value);

        console.log("the chart you chose is " + event.target.value);
    }
    
    return (
        <div className='chart-filter'>
            <div className='chart-filter__control'>
            <label>Graph Type</label>
            <select value={props.selected} onChange={handleDropDownChange}>
                <option value='Bar'>Bar</option>
                <option value='Pie'>Pie</option>
            </select>
            </div>
        </div>
        );
  
};

export default ChartFilter;