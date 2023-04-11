import { motion } from "framer-motion";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Select, { components } from "react-select";
import { getGroups } from "../api/Core";
import { AlertContext } from "../context/AlertContext";
import { UserContext } from "../context/UserContext";
import { getUTCString } from "../js/utils";

const History = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { pushAlert } = useContext(AlertContext);

  // for selections
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);

  const groupsRef = useRef();
  const courseRef = useRef();

  // data
  const [group, setGroup] = useState(null);
  const [course, setCourse] = useState(null);
  const [courseIsDisabled, setCourseIsDisabled] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [shouldUpdate, setShouldUpdate] = useState();

  const handleGroup = (newVal) => {
    if (newVal?.value?.id) {
      setGroup(newVal.value.id);
      setCourses(newVal.value.cours.map((val) => ({ label: val.titre, value: val })));
      setCourseIsDisabled(false);
    } else {
      setGroup(null);
      setCourse(null);
      setCourses([]);
      setCourseIsDisabled(true);
    }
  };
  const handleCourse = (newVal) => {
    if (newVal?.value?.id) {
      setCourse(newVal.value.id);
    } else {
      setCourse(null);
    }
  };
  const handleStart = (ev) => {
    setStartDate(ev?.target?.value);
  };
  const handleEnd = (ev) => {
    setEndDate(ev?.target?.value);
  };

  const resetFilters = () => {
    groupsRef.current.clearValue();
    courseRef.current.clearValue();
    setStartDate("");
    setEndDate("");

    setShouldUpdate(Date.now());
  };

  useEffect(() => {
    const init = async () => {
      // console.log(userGroups);
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
    };
    init();
  }, []);

  return (
    <motion.div className="flex-grow" initial={{ opacity: 0, x: "-2vw" }} animate={{ opacity: 1, x: "0vw", transition: 0.2 }}>
      <div className="flex flex-row px-8 py-4 justify-between space-x-4">
        {/* Filters */}
        <div className="flex-shrink sticky top-8 h-fit">
          <div className="flex flex-col shadow border-b border-gray-200 rounded-sm p-4 bg-white space-y-4">
            <div
              onClick={() => setShouldUpdate(Date.now())}
              className="flex flex-row items-center space-x-2 font-medium px-4 py-2 mb-2 text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="uppercase">Actualiser</div>
            </div>
            <div className="">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 capitalize">
                Filtrer par groupe
              </label>
              <Select ref={groupsRef} isClearable onChange={handleGroup} options={groups} placeholder={"Choisir..."} />
            </div>
            <div className="">
              <label htmlFor="cou rse" className="block text-lg font-medium text-gray-700 capitalize">
                Filtrer par cours
              </label>
              <Select ref={courseRef} isClearable onChange={handleCourse} isDisabled={courseIsDisabled} options={courses} placeholder={"Choisir..."} />
            </div>
            <div className="">
              <label htmlFor="datePicker" className="block text-lg font-medium text-gray-700 capitalize">
                Date début
              </label>
              <input
                onChange={handleStart}
                value={startDate}
                type="datetime-local"
                name="start_date"
                id="start_date"
                className="w-full px-4 py-2 rounded-md p-2 border-2 border-slate-300 focus:border-2 focus:border-blue-400 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="">
              <label htmlFor="datePicker" className="block text-lg font-medium text-gray-700 capitalize">
                Date fin
              </label>
              <input
                onChange={handleEnd}
                value={endDate}
                type="datetime-local"
                name="end_date"
                id="end_date"
                className="w-full px-4 py-2 rounded-md p-2 border-2 border-slate-300 focus:border-2 focus:border-blue-400 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <div
                onClick={() => setShouldUpdate(Date.now())}
                className="w-full text-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 select-none inline-block py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Filtrer
              </div>
              <div
                onClick={resetFilters}
                className="w-full text-center cursor-pointer bg-orange-600 hover:bg-orange-700 select-none inline-block mt-2 py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Réinitialiser
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        <Outlet
          context={{
            shouldUpdate,
            filters: {
              gid: group,
              cid: course,
              startDate: startDate,
              endDate: endDate,
            },
          }}
        />
      </div>
    </motion.div>
  );
};

export default History;
