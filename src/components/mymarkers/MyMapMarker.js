import React from "react";
import { Marker, useMap } from "react-leaflet";

const MyMapMarker = (props) => {
  const map = useMap();
  return (
    <Marker
      eventHandlers={{
        dblclick: (e) => {
          map.flyTo(e.latlng, 18);
        },
      }}
      {...props}
    >
      {props.children}
    </Marker>
  );
};

export default MyMapMarker;
