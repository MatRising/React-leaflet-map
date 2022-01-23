import React, { useEffect, useState } from "react";
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
import { icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  dummyDataPOI,
  dummyDataCars,
  dummyDataParkings,
} from "./consts/additionalMarkerks";
import { determineIconType } from "./helpers/iconType";
import { determineImageType } from "./helpers/imageType";
import MapControlls from "./components/MapControlls";

const ClickEvent = () => {
  const map = useMapEvent("click", (e) => {
    console.log(e.latlng);
  });
  return null;
};
const App = () => {
  const [cars, setCars] = useState([]);
  const [batteryThreshold, setBatteryTreshold] = useState(0);
  const [carStatus, setCarStatus] = useState(false);
  const changeBatteryThreshold = (batteryThreshold) => {
    setBatteryTreshold(batteryThreshold);
  };
  const changeCarStatus = (carStatus) => {
    setCarStatus(carStatus);
  };
  useEffect(() => {
    fetch("https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE")
      .then((response) => response.json())
      .then((data) => setCars([...dummyDataCars, ...data.objects]));
  }, []);
  return (
    <div className="main-container">
      <div className="map-wrapper">
        <MapControlls
          batteryThreshold={batteryThreshold}
          carStatus={carStatus}
          changeBatteryThreshold={changeBatteryThreshold}
          changeCarStatus={changeCarStatus}
        ></MapControlls>
        <MapContainer
          className="map"
          center={[52.1935161702226, 20.9304286193486]}
          zoom={16}
          scrollWheelZoom={true}
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
                        position={[
                          car.location.latitude,
                          car.location.longitude,
                        ]}
                        icon={icon(
                          determineIconType(car.type, car.batteryLevelPct)
                        )}
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
                          {car.status === "AVAILABLE"
                            ? "Car available"
                            : "Car not available"}
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
    </div>
  );
};

export default App;
