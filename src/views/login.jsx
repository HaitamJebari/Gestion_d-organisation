import { info } from "autoprefixer";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../api/Auth";
import { getGroups } from "../api/Core";
import Logo from "../assets/logo.svg";
import Alert from "../components/basic-components/alert";
import { AlertContext } from "../context/AlertContext";
import { UserContext } from "../context/UserContext";

const LoginScreen = () => {
  const { pushAlert } = useContext(AlertContext);

  const [username, setUsername] = useState(null);
  const [pass, setPass] = useState(null);

  const [btnLoading, setBtnLoading] = useState(false);
  const { setUserInfo, setUserGroups } = useContext(UserContext);

  const handleKeyUpEvent = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      await loginAction();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUpEvent);
    return () => {
      window.removeEventListener("keyup", handleKeyUpEvent);
    };
  }, [username, pass]);

  const navigate = useNavigate();

  const loginAction = async () => {
    // setShowAlert(!showAlert);
    setBtnLoading(true);
    // let data = await Login(username, pass);
    // if (data && data?.status == 200) {
    //   if (data.response.access_token) {
    //     localStorage.setItem("_USER_", JSON.stringify(data.response));
        // let groups = await getGroups(data.response.current_user?.uid, data.response.access_token);
        
        // if (groups && groups.status == 200 && groups.response.length > 0) {
        //   localStorage.setItem("_GROUPS_", JSON.stringify(groups.response));
        //   setUserGroups(groups.response);
        // } else {
        //   setUserGroups(null);
        // }
        // setUserInfo(data.response);
        navigate("/", { replace: true });
        setBtnLoading(false);
      }
    // } else {
    //   const id = Date.now();
    //   pushAlert({ id, message: data?.message || "Pas de connexion internet", mode: "danger" });
    // }
    // setAlertList(alertList.push({ id: 1, mode: "info", message: "text here" }));
    // console.log(alertList);
  //   setBtnLoading(false);
  // };

  return (
    <motion.div className="min-h-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: "-5vw" }} animate={{ opacity: 1, y: "0vw", transition: 0.3 }}>
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" /> */}
          <img src={Logo} alt="logo" className="mx-auto h-24 w-auto"></img>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username" className="sr-only">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={(v) => setUsername(v.target.value)}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(v) => setPass(v.target.value)}
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div>
          <button
            disabled={btnLoading}
            onClick={loginAction}
            className="disabled:bg-indigo-200 disabled:cursor-wait group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
        {/* {showAlert ? <Alert mode="info" message="Hello world!" /> : <></>} */}
      </div>
    </motion.div>
  );
};

export default LoginScreen;
