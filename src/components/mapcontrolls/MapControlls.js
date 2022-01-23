import React from "react";
import "./mapcontroll.css";

const MapControlls = ({
  batteryThreshold,
  carStatus,
  changeBatteryThreshold,
  changeCarStatus,
}) => {
  return (
    <div className="controlls">
      <div>
        <label className="toggle">
          <input
            type="checkbox"
            id="availability"
            name="isAvailable"
            value={carStatus}
            onChange={() => changeCarStatus(!carStatus)}
          ></input>
          <span className="toggle-slider"></span>
        </label>
        {carStatus ? "Available" : "All cars"}
      </div>
      <div className="divider"></div>
      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={batteryThreshold}
          onChange={(e) => changeBatteryThreshold(e.target.value)}
        ></input>
      </div>
      <div style={{ textAlign: "center" }}>
        {"Battery > " + batteryThreshold + "%"}
      </div>
    </div>
  );
};

export default MapControlls;
