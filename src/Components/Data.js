import React, {useState, useEffect} from 'react';
import "../index.css"
function Data(props) {

 const [seconds, setSeconds] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 5000);
      }, []);


    const newData = new Date();
    const year = newData.getFullYear();
    const month = newData.toLocaleString('en-US', {month: 'long'});
    const day = newData.toLocaleString('en-US', {day: '2-digit'});
    const weekday = newData.toLocaleString('en-US', {weekday: 'long'});
    const time = newData.toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric'});

     
  return (
    <div className='container'>
      <div className='fweight'>Current UTC time: {time}</div> 
       <div className='fitalic'>{weekday}, {day} {month} {year}</div>
             
    </div>
  );

}

export default Data;