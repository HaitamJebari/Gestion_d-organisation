import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ContactClients from "../views/ContactClients";
import History from "../views/History";
import Group from "../views/Group";
import { AnimatePresence } from "framer-motion";
import LoginScreen from "../views/login";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import MessageHistory from "../components/MessageHistory";
import Participants from "../views/Participants";
import Ajoutergr from "../views/Ajoutergr";
import Modifier from "../views/Modifier";
import ModifierGroup from "../views/ModifierGroup";
import Organisation_liste from "../views/Organisation_liste";
import Ajouter from "../views/Ajouter";
import AjouterOrganisation from "../views/AjouterOrganisation";
import UpdateOraganisation from "../views/UpdateOraganisation";
import ShowGroups from "../views/showGroups";
import MainPage from "../views/MainPage";
const MainRouter = () => {
  const { userInfo } = useContext(UserContext);

  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />

        {/* <Route path="/login" element={<LoginScreen />} /> */}
        <Route path="/Organisation" element={<Organisation_liste/>} />

        <Route path="/gr" element={<Group/>}/>
        <Route path='/ModifierGroup/:id' element={<ModifierGroup/>}/>
        <Route path="/Ajoutergr" element={<Ajoutergr/>}/>
        
        <Route path="/AjouterOrganisation" element={<AjouterOrganisation/>} />
        <Route path="/UpdateOrganisation/:id" element={<UpdateOraganisation/>}/>
        <Route path="/showGroups/:id" element={<ShowGroups/>} />

        <Route path="/participants" element={ <Participants /> }></Route>
        <Route path="/Ajouter" element={ <Ajouter /> }></Route>
        <Route path="/modifier/:id" element={ <Modifier /> }></Route>

      {/* <Routes location={location} key={location.pathname}>   */}

        {/* <Route path="/" element={<Navigate to="/groupes/cours" replace /> } /> */}
        {/* <Route path="/groupes" element={<ContactClients />}/> */}

        {/* <Route path="/login" element={<LoginScreen />} /> */}

        {/* <Route path='/groupes/ModifierGroup/:id' element={<ModifierGroup/>}/> */}
        {/* <Route path="Ajoutergr" element={<Ajoutergr/>}/> */}
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
