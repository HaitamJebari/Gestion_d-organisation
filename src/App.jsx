import { useState } from "react";
import "./App.css";
import TheNav from "./components/TheNav";
import { AppContext } from "./context/AppContext";
import Popup from "./components/Popup";
import MainRouter from "./routes/MainRouter";
import { UserContext } from "./context/UserContext";
import { AlertContext } from "./context/AlertContext";
import { useRef } from "react";
import AlertContainer from "./components/AlertContainer";
import {  } from "react-bootstrap/esm/ThemeProvider";
function App() {
  // App context
  const [showPopup, setShowPopup] = useState(false);
  // User context
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("_USER_")) || null);
  const [userGroups, setUserGroups] = useState(JSON.parse(localStorage.getItem("_GROUPS_")) || null);
  // Alert context
  const [alertList, setAlertList] = useState([]);
  const alertRef = useRef(null);
  const alertListRef = useRef([]);

  const pushAlert = (A) => {
    alertRef.current = A;
    alertListRef.current.push(A);
    setAlertList(Date.now());
  };

  return (
    <div className="APP">
      <AppContext.Provider value={{ showPopup, setShowPopup }}>
        <UserContext.Provider value={{ userInfo, setUserInfo, userGroups, setUserGroups }}>
            <TheNav />
          <AlertContext.Provider value={{ alertRef, alertListRef, alertList, setAlertList, pushAlert }}>
            <div className="relative h-full">
              <MainRouter />
              {showPopup && <Popup />}
              <AlertContainer />
            </div>
          </AlertContext.Provider>
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
