import React from "react";
import "../index.css"


class PeopleAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://api.open-notify.org/astros.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.people
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

 

  render() {
    const { error, isLoaded, items } = this.state;      

    let peopleNumber = items.filter(function(e){
        return e.craft === "ISS";
     });


    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div>

        
         <ul className="container">
          {peopleNumber.map(item => (
           <li className="container d-flex" key={item.name}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
             <span className="ptop">{item.name}  </span>              
            </li>
          ))}
        </ul>  
        <p className="container"> Total amout: {peopleNumber.length} people on ISS</p>
        </div>
      );
    }
  }
}

export default PeopleAPI;