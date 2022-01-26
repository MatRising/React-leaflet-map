import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvent,
  LayersControl,
  Tooltip,
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
import MapControlls from "./components/mapcontrolls/MapControlls";
import MyMapMarker from "./components/mymarkers/MyMapMarker";
import ParkingIcon from "./images/parking_icon.png";

const ClickEvent = () => {
  const map = useMapEvent("click", (e) => {
    console.log(e.latlng);
  });
  return null;
};
const App = () => {
  const [cars, setCars] = useState([]);
  const [POI, setPOI] = useState([]);
  const [parking, setParking] = useState([]);
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

    fetch("https://dev.vozilla.pl/api-client-portal/map?objectType=PARKING")
      .then((response) => response.json())
      .then((data) => setParking([...dummyDataParkings, ...data.objects]));

    fetch("https://dev.vozilla.pl/api-client-portal/map?objectType=POI")
      .then((response) => response.json())
      .then((data) => setPOI([...dummyDataPOI, ...data.objects]));
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
                      <MyMapMarker
                        markerType={"car"}
                        data={car}
                        key={car.id}
                        position={[
                          car.location.latitude,
                          car.location.longitude,
                        ]}
                        icon={icon(
                          determineIconType(car.type, car.batteryLevelPct)
                        )}
                      >
                        <Popup closeButton={false}>
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
                      </MyMapMarker>
                    );
                  })}
              </MarkerClusterGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Parking">
              <MarkerClusterGroup disableClusteringAtZoom={18}>
                {parking.map((parkingSpot) => {
                  return (
                    <MyMapMarker
                      data={parkingSpot}
                      markerType={"parking"}
                      key={parkingSpot.id}
                      position={[
                        parkingSpot.location.latitude,
                        parkingSpot.location.longitude,
                      ]}
                      icon={icon({
                        iconUrl: ParkingIcon,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12],
                        popupAnchor: [0, -15],
                        tooltipAnchor: [15, 0],
                      })}
                    >
                      <Tooltip>{parkingSpot.name}</Tooltip>
                      <Popup closeButton={false}>
                        {parkingSpot.name}
                        <br></br>
                        {parkingSpot.description}
                        <br></br>
                        {`${parkingSpot.address.city} ${parkingSpot.address.street} ${parkingSpot.address.house}`}
                        <br></br>
                        {`Spaces ${parkingSpot.spacesCount}/${parkingSpot.availableSpacesCount}`}
                        <br></br>
                      </Popup>
                    </MyMapMarker>
                  );
                })}
              </MarkerClusterGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="POI">
              <MarkerClusterGroup>
                {POI.map((POI) => {
                  return (
                    <MyMapMarker
                      data={POI}
                      markerType={"POI"}
                      key={POI.id}
                      position={[POI.location.latitude, POI.location.longitude]}
                    >
                      <Tooltip>{POI.name}</Tooltip>
                      <Popup closeButton={false}>
                        {POI.name}
                        <br></br>
                        {POI.category}
                        <br></br>
                        {POI.description}
                        <br></br>
                        {`${POI.address.city} ${POI.address.street} ${POI.address.house}`}
                        <br></br>
                      </Popup>
                    </MyMapMarker>
                  );
                })}
              </MarkerClusterGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
