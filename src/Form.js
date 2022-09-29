import React from "react";
import './index.css';

const defaultCurrencies = ['UAH', 'USD', 'EUR', 'CNY'];

export const Form = ({ value, onChangeValue, onChangeCurrency}) => (

<div className="container">
  <form className="unit-conversion">
  <input
  onChange={(e) => onChangeValue(e.target.value)}
  value={value}
  type='number'/>


<select onChange={(e) => onChangeCurrency(e.target.value)}>
{defaultCurrencies.map((cur) =>  
      <option
      key={cur} >
      {cur}
      
      </option>
    )}  
  </select>
  
  </form>
</div>

 
 );