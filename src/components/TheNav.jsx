import { Link, Route, Routes } from "react-router-dom";
import CustomLink from "./basic-components/CustomLink";
import Logo from "../assets/logo.svg";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { openBackOffice } from "../api/Core";
import './TheNav.css'
const TheNav = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const logOutAction = () => {
    setUserInfo(null);
    localStorage.removeItem("_USER_");
  };
  const openBack = async () => {
    console.log(userInfo);
    let redirect = await openBackOffice(userInfo.current_user.uid, userInfo.access_token);
    if (redirect.status == 200) {
      window.open(redirect.response);
    }
  };
  return (
    <>

       <div className="w3-sidebar w3-bar-block w3-collapse w3-card" id="mySidebar">
       <button class="w3-bar-item w3-button w3-hide-large"> Close </button>
          <Link to='/'><img src={Logo} alt="logo" className="w-16"></img></Link> 
           <div className="flex space-x-12 ml-20">
              <CustomLink to="/gr" exact={false}>
                Gestion des groupes
              </CustomLink>
              <CustomLink to="/organisation" exact={false}>
                Gestion d'organisation
              </CustomLink>
              <CustomLink to="/participants" exact={false}>
                Gestion des participants
              </CustomLink>
              {/* <a href="https://digitaldevops.net/drupal/">
                <div>Gérer les groupes</div>
              </a> */}
            </div>
        </div>


        <div className="w3-main" id='main'>
              <div className="w3-teal">
                 <button className="w3-button w3-teal w3-xlarge" >XXX</button>
                   <div className="w3-container" id='cnt'>

        {userInfo ? (
          <div className="flex-shrink flex items-center space-x-4">
            <div
              onClick={openBack}
              className="cursor-pointer
               px-3 py-2 
               uppercase text-indigo-600 text-lg 
               font-semibold bg-gradient-to-t 
               from-blue-100 to-blue-200 bg-no-repeat 
               [background-position:0_88%] [background-size:100%_0.2em]  
               motion-safe:transition-all motion-safe:duration-200 hover:[background-size:100%_100%]  
               hover:text-indigo-800"
            >
              <div>Ouvrir Dashboard</div>
            </div>
            <div>
              Bonjour, <span className="font-medium capitalize">{userInfo?.current_user?.name}</span>{" "}
            </div>
            {/* <div className="font-black text-3xl">LOGO</div> */}
            <div className="flex flex-row items-center space-x-2 font-medium px-4 py-2 text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-700" onClick={logOutAction}>
              <div className="uppercase">se déconnecter</div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ) : (
          <></>
        )}
         </div>
         </div>
         </div>
    
    </>
  );
};
export default TheNav;
