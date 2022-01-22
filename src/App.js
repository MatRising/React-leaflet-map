import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  LayersControl,
  Tooltip,
  LayerGroup,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import { icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  dummyDataPOI,
  dummyDataCars,
  dummyDataParkings,
} from "./consts/additionalMarkerks";
import Sedan from "./images/Sedan.png";
import SUV from "./images/SUV.png";
import Hatchback from "./images/Hatchback.png";
import SedanParking from "./images/SedanParking.jpg";
import SUVParking from "./images/SUVParking.jpg";
import HatchbackParking from "./images/HatchbackParking.jpg";

const ClickEvent = () => {
  const map = useMapEvent("click", (e) => {
    console.log(e.latlng);
  });
  return null;
};

const determineImageType = (carType) => {
  if (carType === "CAR") {
    return (
      <img
        style={{ height: "100%", width: "100%" }}
        src={SedanParking}
        alt="car"
      ></img>
    );
  } else if (carType === "TRUCK") {
    return (
      <img
        style={{ height: "100%", width: "100%" }}
        src={SUVParking}
        alt="car"
      ></img>
    );
  } else
    return (
      <img
        style={{ height: "100%", width: "100%" }}
        src={HatchbackParking}
        alt="car"
      ></img>
    );
};
const determineIconType = (carType) => {
  if (carType === "CAR") {
    return {
      iconUrl: Sedan,
      iconSize: [50, 25],
      iconAnchor: [25, 20],
      popupAnchor: [0, -15],
    };
  } else if (carType === "TRUCK") {
    return {
      iconUrl: SUV,
      iconSize: [50, 25],
      iconAnchor: [25, 20],
      popupAnchor: [0, -15],
    };
  } else
    return {
      iconUrl: Hatchback,
      iconSize: [50, 25],
      iconAnchor: [25, 20],
      popupAnchor: [0, -15],
    };
};
const App = () => {
  const [cars, setCars] = useState([]);
  const [batteryThreshold, setBatteryTreshold] = useState(0);
  const [carStatus, setCarStatus] = useState();
  useEffect(() => {
    fetch("https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE")
      .then((response) => response.json())
      .then((data) => setCars([...dummyDataCars, ...data.objects]));
  }, []);
  return (
    <div className="main-container">
      <div className="controlls">
        <div>
          <input
            type="checkbox"
            id="availability"
            name="isAvailable"
            value={carStatus}
            onChange={(e) => setCarStatus(!carStatus)}
          ></input>
          {carStatus ? "Only Available" : "ALL"}
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={batteryThreshold}
            onChange={(e) => setBatteryTreshold(e.target.value)}
          ></input>
        </div>
        <div style={{ textAlign: "center" }}>
          {"Battery: " + batteryThreshold + "%+"}
        </div>
      </div>
      <MapContainer
        className="map"
        center={[52.1935161702226, 20.9304286193486]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <ClickEvent></ClickEvent>
        <LayersControl>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl.Overlay checked name="Cars">
            <MarkerClusterGroup
              showCoverageOnHover={false}
              disableClusteringAtZoom={18}
            >
              {cars
                .filter((car) => car.batteryLevelPct >= batteryThreshold)
                .filter((car) =>
                  carStatus === true ? car.status === "AVAILABLE" : true
                )
                .map((car) => {
                  return (
                    <Marker
                      key={car.id}
                      position={[car.location.latitude, car.location.longitude]}
                      icon={icon(determineIconType(car.type))}
                    >
                      <Popup>
                        {car.name}
                        <br />
                        {"Plate: " + car.platesNumber}
                        <br />
                        {"Battery " + car.batteryLevelPct + "%"}
                        <br />
                        {"Range " + car.rangeKm + "km"}
                        <br />
                        {determineImageType(car.type)}
                      </Popup>
                    </Marker>
                  );
                })}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Parking">
            <LayerGroup>
              {dummyDataParkings.map((parking) => {
                return (
                  <Marker
                    key={parking.id}
                    position={[
                      parking.location.latitude,
                      parking.location.longitude,
                    ]}
                  >
                    <Tooltip>{parking.name}</Tooltip>
                  </Marker>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="POI">
            <LayerGroup>
              {dummyDataPOI.map((parking) => {
                return (
                  <Marker
                    key={parking.id}
                    position={[
                      parking.location.latitude,
                      parking.location.longitude,
                    ]}
                  >
                    <Tooltip>{parking.name}</Tooltip>
                  </Marker>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default App;
