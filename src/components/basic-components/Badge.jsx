import classNames from "classnames";
import React from "react";

const Badge = ({ state, value }) => {
  // message state :
  // PENDING, DELIVERED, RECIEVED, READ
  // action :
  // FORGOTTEN, STARTED, FINISHED
  let badgeStyle = classNames({
    baseBadge: true,
    pending: state == "PENDING",
    delivered: state == "DELIVERED",
    received: state == "RECIEVED",
    read: state == "READ",
    forgotten: state == "FORGOTTEN",
    started: state == "STARTED",
    finished: state == "FINISHED",
  });
  const words = { PENDING: "En attente", DELIVERED: "Livré", RECIEVED: "Reçu", READ: "Lu", FORGOTTEN: "Non commencé", STARTED: "Commencé", FINISHED: "Terminé" };
  return <span className={badgeStyle}>{words[value]}</span>;
};

export default Badge;
