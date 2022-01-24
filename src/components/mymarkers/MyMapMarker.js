import React from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import "./mymapmarker.css";
import Sedan from "../../images/SedanParking.jpg";
import Bookmark from "../../images/bookmark.svg";
import Dirrection from "../../images/dirrection.svg";

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
      {props.markerType === "test" ? (
        <Popup closeButton={false}>
          <div className="my-popup-content">
            <div className="image-wrapper">
              <img className="image" src={Sedan} alt="Car image"></img>
            </div>
            <div className="flex-wrapper">
              <div className="text-wrapper">
                <p className="text-name">Car Name</p>
                <p>WXN592PK</p>
                <p>Available</p>
                <p>Battery Level</p>
                <p>Range Km</p>
              </div>
              <div className="actions-wrapper">
                <div>
                  <img src={Dirrection}></img>
                </div>
                <div>
                  <img src={Bookmark}></img>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      ) : (
        props.children
      )}
      {
        //props.children
      }
    </Marker>
  );
};

export default MyMapMarker;
