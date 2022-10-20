import React from "react";
import PeopleAPI from "./Components/PeopleAPI.js";
import Map from "./Components/Map.js";
import Data from "./Components/Data.js";
import "./index.css"


class API extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      iss_position: []
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetch("http://api.open-notify.org/iss-now.json")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              iss_position: result.iss_position
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }, 5000);
  }

  render() {

    const { error, isLoaded, iss_position } = this.state;
    let latitude = iss_position.latitude;
    let longitude = iss_position.longitude;

    const coordinate = [
      {
        lat: +iss_position.latitude,
        lng: +iss_position.longitude,
      }
    ]

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (

        <div className="d-flex">
        <div className="mright">
            <div className="container">
              <p className="fweight">ISS is now lockated at:</p>
              <p className="fitalic">latitude: {latitude} longitude: {longitude}</p>
            </div>          
              <Map lat={coordinate[0].lat} lng={coordinate[0].lng} /> 
          </div>
              
            <div>
              <Data />
              <PeopleAPI />
            </div>      

        </div>
      );
    }
  }
}
export default API;

