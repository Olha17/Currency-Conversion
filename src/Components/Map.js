import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '500px'
};


function GMap(props) {

  let center =  {
    lat: props.lat,
    lng: props.lng
  };

  const position = {
    lat: props.lat,
    lng: props.lng
  }

 const { isLoaded } = useJsApiLoader({
   id: 'google-map-script',
   googleMapsApiKey: "AIzaSyD9zL9mZ_IXbQjmAiyJen2UCgki3C6IJ0c"
 })

 const [map, setMap] = React.useState(null)

 const onLoad = React.useCallback(function callback(map) {
   const bounds = new window.google.maps.LatLngBounds(center);
   map.fitBounds(bounds);
   setMap(map)
 }, [])

 const onUnmount = React.useCallback(function callback(map) {
   setMap(null)
 }, [])

 return isLoaded ? (
   <GoogleMap
     mapContainerStyle={containerStyle}
     center={center}
     zoom={4}
     onLoad={onLoad}
     onUnmount={onUnmount}
   >
     <Marker
      position={position}
    />
   </GoogleMap>
) : <></>
}

export default React.memo(GMap)