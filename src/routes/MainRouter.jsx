import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SendCourse from "../components/SendCourse";
import ContactClients from "../views/ContactClients";
import History from "../views/History";
import Group from "../views/Group";
import { AnimatePresence } from "framer-motion";
import SendCred from "../components/SendCred";
import LoginScreen from "../views/login";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import MessageHistory from "../components/MessageHistory";
import ModifierGroup from "../views/ModifierGroup";
import Ajouter from "../views/Ajouter";

const MainRouter = () => {
  const { userInfo } = useContext(UserContext);

  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/gr" replace />} />

        <Route path="/login" element={<LoginScreen />} />

        <Route path="/gr" element={<Group/>}/>
        <Route path='/Modfier/:id' element={<ModifierGroup/>}/>
        <Route path="/Ajouter" element={<Ajouter/>}/>
        {/* <Route path="/groupes" element={<ContactClients />}>
          <Route index path="" element={<Navigate to="/groupes/cours" replace />} />
          <Route index path="cours" element={<SendCourse />} />
          <Route index path="creds" element={<SendCred />} />
          {/* more subroutes ... */}
        {/* </Route> */} 

        <Route path="/history" element={userInfo ? <History /> : <Navigate to="/login" replace />}>
          <Route path="" element={<MessageHistory />} />
        </Route>
        {/* <Route path="/history" element={userInfo ? <History /> : <Navigate to="/login" replace />} /> */}
      </Routes>
    </AnimatePresence>
  );
};

export default MainRouter;
