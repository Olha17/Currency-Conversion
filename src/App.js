import React from "react";
import {Form} from "./Form";
import './index.css';
import { useEffect, useState } from "react";

function App() {

  const [EURCurrency] = React.useState('EUR');
  const [UAHCurrency] = React.useState('UAH');
  const [USDCurrency] = React.useState('USD');
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('UAH');
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState(0);
  const ratesRef = React.useRef({});



  const useAPI = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
  
    const fetchAPI = () => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          ratesRef.current = json.rates;
          onChangeFromPrice(1);
          setLoading(false);
          setData(json);
        })
        .catch((err) =>{
          console.warn(err);
          alert('Данные не загрузились. Проверьте подключение к сети.')
          });
        
    };
  
    useEffect(() => {
      fetchAPI();
    }, []);
  
    return { loading, data };
  };



 const { loading, data } = useAPI(
  "https://cdn.cur.su/api/latest.json"
  );



const onChangeFromPrice = (value) => {
  const price = value / ratesRef.current[fromCurrency];
  const result = price * ratesRef.current[toCurrency];
  setToPrice(result.toFixed(2));
  setFromPrice(value);
}

const onChangeToPrice = (value) => {
  const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
  setFromPrice(result.toFixed(2)); 
  setToPrice(value);
}

React.useEffect(() => {
  onChangeFromPrice(fromPrice);
}, [fromCurrency]);

React.useEffect(() => {
  onChangeToPrice(toPrice);
}, [toCurrency]);

if (loading) return <h1>Loading</h1>;

  return (
    <div className="App">
      <div className="header">
        <h4> {Math.round(ratesRef.current[UAHCurrency]*ratesRef.current[USDCurrency]*100)/100} USD </h4>
        <h4> {Math.round(ratesRef.current[UAHCurrency]*ratesRef.current[EURCurrency]*100)/100} EUR</h4>
      </div>
    <Form value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
    <Form value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
);
}

export default App;