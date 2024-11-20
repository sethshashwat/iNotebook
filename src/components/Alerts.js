import React from "react";

function Alerts(props) {
  const capitalize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (<div className="alert alert-primary alert-dismissible fade show" role="alert">
        <div>
          {" "} <strong> {capitalize(props.alert.type)} </strong>: {" "} {props.alert.message}{" "}
        </div>
      </div>
      )}
    </div>
  );
}

export default Alerts;