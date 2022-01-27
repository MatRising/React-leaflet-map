import SedanRed from "../images/SedanRed.png";
import SedanGreen from "../images/SedanGreen.png";
import SUVRed from "../images/SUVRed.png";
import SUVGreen from "../images/SUVGreen.png";
import HatchbackRed from "../images/HatchbackRed.png";
import HatchbackGreen from "../images/HatchbackGreen.png";

export const determineIconType = (carType, batteryLevel = 0) => {
  const isCarChargedEnough = batteryLevel > 45 ? true : false;
  if (carType === "CAR") {
    return {
      iconUrl: isCarChargedEnough ? SedanGreen : SedanRed,
      iconSize: [50, 25],
      iconAnchor: [25, 20],
      popupAnchor: [0, -28],
    };
  } else if (carType === "TRUCK") {
    return {
      iconUrl: isCarChargedEnough ? SUVGreen : SUVRed,
      iconSize: [50, 25],
      iconSize: [50, 25],
      iconAnchor: [25, 20],
      popupAnchor: [0, -28],
    };
  } else
    return {
      iconUrl: isCarChargedEnough ? HatchbackGreen : HatchbackRed,
      iconSize: [50, 25],
      iconSize: [50, 25],
      iconAnchor: [25, 20],
      popupAnchor: [0, -28],
    };
};
