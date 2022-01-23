import SedanParking from "../images/SedanParking.jpg";
import SUVParking from "../images/SUVParking.jpg";
import HatchbackParking from "../images/HatchbackParking.jpg";

export const determineImageType = (carType) => {
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
