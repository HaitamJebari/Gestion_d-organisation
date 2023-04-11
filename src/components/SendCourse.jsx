import { useContext, useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { getGroups, sendData } from "../api/Core";
import { UserContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertContext";
import { getUTCString } from "../js/utils";

const SendCourse = () => {
  const { pushAlert } = useContext(AlertContext);
  const { setShowPopup } = useContext(AppContext);
  const { userInfo, setUserInfo, userGroups } = useContext(UserContext);

  const [isLoadingGroups, setIsLoadingGroups] = useState(true);
  // const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  // const [isLoadingClients, setIsLoadingClients] = useState(true);

  // select options
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  // disabled state
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [formDisabled, setFormDisabled] = useState(true);

  // selected data
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState(null);

  // is sending btn state
  const [btnLoading, setBtnLoading] = useState(false);

  // recipients select mode : Include / exclude
  const [toggleState, setToggleState] = useState(false);

  const SendMessage = async () => {
    let recs = toggleState ? selectedUsers : users.filter((value) => !selectedUsers.includes(value));

    if (recs.length < 1) {
      pushAlert({ id: Date.now(), message: "ERROR!!", mode: "danger" });
      return;
    }

    // formatting date ↓ local to UTC with format 'yyyy-MM-dd HH:mm:ss'
    // let t = new Date();
    // let day = t.getUTCDate() > 9 ? t.getUTCDate() : "0".concat(t.getUTCDate());
    // let month = t.getUTCMonth() + 1 > 9 ? t.getUTCMonth() + 1 : "0".concat(t.getUTCMonth() + 1);
    // let year = t.getUTCFullYear();
    // let hour = t.getUTCHours() > 9 ? t.getUTCHours() : "0".concat(t.getUTCHours());
    // let minute = t.getUTCMinutes() > 9 ? t.getUTCMinutes() : "0".concat(t.getUTCMinutes());
    // let second = t.getUTCSeconds() > 9 ? t.getUTCSeconds() : "0".concat(t.getUTCSeconds());
    // ++++++++++++++++++

    let dataToSend = {
      token: userInfo.access_token,
      messageorder: {
        texte_attache: message,
        cours: selectedCourse?.value,
        users: recs.map((user) => user.value),
        manager_id: userInfo?.current_user?.uid,
        groupe: { id: selectedGroup.id, nom: selectedGroup.nom, users: [null], cours: [null] },
        date_envoi: getUTCString(),
      },
    };

    // console.log(JSON.stringify(dataToSend));
    console.log(dataToSend);

    setBtnDisabled(true);
    setBtnLoading(true);
    let ret = await sendData(dataToSend);
    if (ret && ret.status == 200) {
      setShowPopup(true);
    } else {
      pushAlert({ id: Date.now(), message: "réessayer plus tard", mode: "danger" });
    }

    setBtnDisabled(false);
    setBtnLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      let data = await getGroups(userInfo?.current_user?.uid, userInfo?.access_token);
      console.log("data\n", data);
      if (data.status == 200) {
        if (data.response.length !== 0) {
          setGroups(data.response.map((val) => ({ label: val.nom, value: val })));
        } else {
          setGroups([]);
          pushAlert({ id: Date.now(), message: "Vous n'avez aucun groupe avec du contenu !", mode: "warning" });
        }
      } else if (data.status == 403) {
        pushAlert({ id: Date.now(), message: "Session expirée", mode: "danger" });
        setUserInfo(null);
        localStorage.removeItem("_USER_");
      }

      setIsLoadingGroups(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (selectedCourse && selectedGroup) {
      setBtnDisabled(false);
    }
  }, [selectedCourse, selectedGroup]);

  const handleGroup = (newVal) => {
    if (newVal) {
      setSelectedGroup(newVal.value);
      setCourses(newVal.value.cours.map((val) => ({ label: val.titre, value: val })));
      setUsers(newVal.value.users.map((val) => ({ label: `${val.nom} ${val.numero_tel}`, value: val })));
      setFormDisabled(false);
    }
  };
  const handleCourse = (newVal) => {
    if (newVal) {
      setSelectedCourse(newVal);
    }
  };

  const handleRec = (newVal) => {
    if (newVal) {
      setSelectedUsers(newVal);
    }
  };

  const handleMessage = (event) => {
    // console.log("from button \n", event.target.value);
    setMessage(event.target.value);
  };

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Vide...</span>
      </components.NoOptionsMessage>
    );
  };

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  return (
    <motion.div className="p-4 w-3/4 mx-auto rounded-md ring-1 mt-4 shadow-lg shadow-gray-300" initial={{ opacity: 0, x: "-5vw" }} animate={{ opacity: 1, x: "0vw", transition: 0.3 }}>
      {/* Group */}
      <div>
        <label className="block text-md font-medium text-gray-700 mt-1 capitalize">groupe :</label>
        <div className="mt-1">
          <Select onChange={handleGroup} options={groups} isLoading={isLoadingGroups} components={{ NoOptionsMessage, Placeholder }} placeholder={"Choisir..."} />
        </div>
      </div>
      {/* Cour */}
      <div>
        <label className="block text-md font-medium text-gray-700 mt-1 capitalize">Cours :</label>
        <div className="mt-1">
          <Select isDisabled={formDisabled} onChange={handleCourse} options={courses} components={{ NoOptionsMessage, Placeholder }} placeholder={"Choisir..."} />
        </div>
      </div>
      {/* Text message */}
      <div>
        <label className="block text-md font-medium text-gray-700 mt-1 capitalize">Message attaché :</label>
        <div className="mt-1">
          <textarea
            maxLength={255}
            onChange={handleMessage}
            // value={message}
            disabled={formDisabled}
            id="body"
            name="body"
            rows="3"
            className="disabled:cursor-not-allowed w-full rounded-md p-2 border-2 border-blue-300 focus:border-2 focus:border-blue-400 focus:ring-indigo-500 focus:outline-none"
            placeholder="Saisissez un message attaché ..."
          />
        </div>
      </div>
      {/* toggle */}
      <div className="inline-flex items-center space-x-2 -mb-2 relative">
        <div className="cursor-help group">
          <div
            id="tooltip-default"
            role="tooltip"
            className="hidden group-hover:z-50 group-hover:inline-block absolute py-2 px-3 -translate-y-10 text-sm text-white bg-gray-900 rounded-lg shadow-sm"
            // class="inline-block absolute py-2 px-3 text-sm font-medium  opacity-0 transition-opacity duration-300 dark:bg-gray-700"
          >
            Modifie le comportement du champ de sélection des destinataires. <br /> <span className="uppercase font-semibold">- Inclure :</span> inclut uniquement les personnes sélectionnées. <br />{" "}
            <span className="uppercase font-semibold">- Exclure :</span> inclut tout le monde sauf ceux qui sont sélectionnés.
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="py-2 capitalize font-medium">exclure</span>
        <div className="inline-flex relative items-center cursor-pointer">
          <input
            onChange={() => {
              console.log("changed");
            }}
            checked={toggleState}
            type="checkbox"
            name="mode"
            id="mode_toggle"
            className="sr-only peer"
          />
          <div
            onClick={() => {
              console.log(toggleState);
              setToggleState(!toggleState);
            }}
            className="w-11 h-6 bg-slate-500 bg-opacity-25 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"
          ></div>
        </div>
        <span className="py-2 capitalize font-medium">inclure</span>
      </div>

      {/* Recepients*/}
      <div>
        <label className="block text-md font-medium text-gray-700 mt-1 capitalize">bénéficiaires :</label>
        <div className="mt-1">
          <Select isMulti isDisabled={formDisabled} onChange={handleRec} options={users} isLoading={isLoadingGroups} components={{ NoOptionsMessage, Placeholder }} placeholder={"Choisir..."} />
        </div>
      </div>
      <div className="mt-4">
        <button
          disabled={btnDisabled}
          onClick={SendMessage}
          className="inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-indigo-600 hover:bg-indigo-700 select-none py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {btnLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              En cours d'envoi ...
            </>
          ) : (
            <>Envoyer un message</>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default SendCourse;

const runOnMounted = (cb) => {
  useEffect(cb, []);
};

const runOnunMounted = (cb) => {
  useEffect(() => cb, []);
};

const watch = (cb, ...deps) => {
  useEffect(cb, deps);
};
