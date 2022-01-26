import React from "react";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import "./mymapmarker.css";
import Sedan from "../../images/SedanParking.jpg";
import Bookmark from "../../images/bookmark.svg";
import Dirrection from "../../images/dirrection.svg";
import { determineCarImageUrl } from "../../helpers/imageType";

/*
const markerType = (markerType, data) => {
  if (data === undefined) return null;
  return (
    <>
      {markerType !== "car" && <Tooltip>{data.name}</Tooltip>}
      <Popup closeButton={false}>
        <div className="my-popup-content">
          <div className="image-wrapper">
            <img
              className="image"
              src={determineCarImageUrl(data.type)}
              alt="Obejct image"
            ></img>
          </div>
          <div className="flex-wrapper">
            <div className="text-wrapper">
              <p className="text-name">{data.name}</p>
              <p>{"Plate: " + data.platesNumber}</p>
              <p>
                {data.status === "AVAILABLE"
                  ? "Car available"
                  : "Car not available"}
              </p>
              <p>{"Battery " + data.batteryLevelPct + "%"}</p>
              <p>{"Range " + data.rangeKm + "Km"}</p>
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
    </>
  );
};
*/

const markerType = (markerType, data) => {
  if (markerType === "car") {
    return (
      <Popup closeButton={false}>
        <div className="my-popup-content">
          <div className="image-wrapper">
            <img
              className="image"
              src={determineCarImageUrl(data.type)}
              alt="Obejct image"
            ></img>
          </div>
          <div className="flex-wrapper">
            <div className="text-wrapper">
              <p className="text-name">{data.name}</p>
              <p>{"Plate: " + data.platesNumber}</p>
              <p>
                {data.status === "AVAILABLE"
                  ? "Car available"
                  : "Car not available"}
              </p>
              <p>{"Battery " + data.batteryLevelPct + "%"}</p>
              <p>{"Range " + data.rangeKm + "Km"}</p>
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
    );
  } else if (markerType === "POI") {
    return (
      <>
        <Tooltip>{data.name}</Tooltip>
        <Popup closeButton={false}>
          <div className="my-popup-content">
            <div className="image-wrapper">
              <img
                className="image"
                src={determineCarImageUrl("CAR")}
                alt="Obejct "
              ></img>
            </div>
            <div className="flex-wrapper">
              <div className="text-wrapper">
                <p className="text-name">{data.name}</p>
                <p>{"Category: " + data.category}</p>
                <p>{data.description}</p>
                <p>
                  {`${data.address.city !== null ? data.address.city : ""} ${
                    data.address.street !== null ? data.address.street : ""
                  } ${data.address.house !== null ? data.address.house : ""}`}
                </p>
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
      </>
    );
  } else if (markerType === "parking") {
    return (
      <>
        <Tooltip>{data.name}</Tooltip>
        <Popup closeButton={false}>
          <div className="my-popup-content">
            <div className="image-wrapper">
              <img
                className="image"
                src={determineCarImageUrl("CAR")}
                alt="Obejct image"
              ></img>
            </div>
            <div className="flex-wrapper">
              <div className="text-wrapper">
                <p className="text-name">{data.name}</p>
                <p>{data.description}</p>
                <p>
                  {`${data.address.city !== null ? data.address.city : ""} ${
                    data.address.street !== null ? data.address.street : ""
                  } ${data.address.house !== null ? data.address.house : ""}`}
                </p>
                <p>{`Spaces ${
                  data.spacesCount !== null ? data.spacesCount : ""
                }/${
                  data.availableSpacesCount !== null
                    ? data.availableSpacesCount
                    : ""
                }`}</p>
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
      </>
    );
  } else return null;
};
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
      {markerType(props.markerType, props.data)}
      {/* 
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
      */}
    </Marker>
  );
};

export default MyMapMarker;
