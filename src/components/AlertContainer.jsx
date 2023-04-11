import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";
import Alert from "./basic-components/alert";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const AlertContainer = (props) => {
  const { alertRef, alertListRef, alertList, setAlertList } = useContext(AlertContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(alertListRef.current);
  }, [alertListRef.current]);

  useEffect(() => {
    if (alertRef.current) {
      autoDismiss(alertRef.current.id);
    }
  }, [alertRef.current]);

  const dismissAlert = (a) => {
    alertListRef.current.splice(
      alertListRef.current.findIndex((value) => value.id == a),
      1
    );
    setAlertList(Date.now());
  };

  const autoDismiss = function (alertId, alertTimeout = 3000) {
    setTimeout(() => {
      dismissAlert(alertId);
    }, alertTimeout);
  };

  return (
    <div className="absolute top-4 right-0 pr-4 overflow-x-hidden">
      <AnimatePresence>
        {list.map((val) => (
          <div
            key={val.id}
            onClick={() => {
              dismissAlert(val.id);
            }}
          >
            <Alert id={val.id} mode={val?.mode} message={val?.message} selfDismiss={autoDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertContainer;
