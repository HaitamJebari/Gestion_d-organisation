import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Select, { components } from "react-select";
import { getHistory, sendData } from "../api/Core";
import Badge from "./basic-components/Badge";
import Modal from "react-modal";
import Pagination from "./basic-components/Pagination";
import { useOutletContext } from "react-router-dom";
import { getUTCString } from "../js/utils";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { AppContext } from "../context/AppContext";
import { AlertContext } from "../context/AlertContext";
import Loader from "./basic-components/Loader";
import { useRef } from "react";

const MessageHistory = () => {
  const { userInfo } = useContext(UserContext);
  const { setShowPopup } = useContext(AppContext);
  const { pushAlert } = useContext(AlertContext);

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [historyArr, setHistoryArr] = useState([]);
  const [suiviArr, setSuiviArr] = useState([]);
  const [displayedSuiviArr, setDisplayedSuiviArr] = useState([]);
  const [suiviId, setSuiviId] = useState(null);
  const [suiviMeta, setSuiviMeta] = useState(null);
  const [page, setPage] = useState(-1);
  const [nPage, setNpage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  // suivi filters
  const [selectedMessageState, setSelectedMessageState] = useState(null);
  const [selectedCourseState, setSelectedCourseState] = useState(null);
  const [selectedFName, setSelectedFName] = useState(null);
  const [selectedLName, setSelectedLName] = useState(null);

  const MessageStateRef = useRef();
  const CourseStateRef = useRef();

  const messageState = ["PENDING", "DELIVERED", "RECIEVED", "READ"];
  const courseState = ["FORGOTTEN", "STARTED", "FINISHED"];
  const words = {
    PENDING: "En attente",
    DELIVERED: "Livré",
    RECIEVED: "Reçu",
    READ: "Lu",
    FORGOTTEN: "Non commencé",
    STARTED: "Commencé",
    FINISHED: "Terminé",
  };

  const messageStateOptions = messageState.map((val) => ({
    label: words[val],
    value: val,
  }));
  const courseStateOptions = courseState.map((val) => ({
    label: words[val],
    value: val,
  }));

  const { shouldUpdate, filters } = useOutletContext();

  const handleMessageState = (newVal) => {
    if (newVal?.value) {
      setSelectedMessageState(newVal.value);
    } else {
      setSelectedMessageState(null);
    }
  };
  const handleCourseState = (newVal) => {
    if (newVal?.value) {
      setSelectedCourseState(newVal.value);
    } else {
      setSelectedCourseState(null);
    }
  };

  const applySuiviFilters = (ev, reset = false) => {
    let tmpArr = suiviArr;

    if (!reset) {
      if (selectedMessageState) {
        tmpArr = tmpArr.filter(
          (val) => val.etat_message == selectedMessageState
        );
      }
      if (selectedCourseState) {
        tmpArr = tmpArr.filter(
          (val) => val.action_cours == selectedCourseState
        );
      }
      if (selectedFName) {
        tmpArr = tmpArr.filter((val) =>
          val.user.prenom.toLowerCase().includes(selectedFName.toLowerCase())
        );
      }
      if (selectedLName) {
        tmpArr = tmpArr.filter((val) =>
          val.user.nom.toLowerCase().includes(selectedLName.toLowerCase())
        );
      }
    } else {
      setSelectedFName(null);
      setSelectedLName(null);
      setSelectedMessageState(null);
      MessageStateRef.current.clearValue();
      CourseStateRef.current.clearValue();
    }

    setDisplayedSuiviArr(tmpArr);
  };

  useEffect(() => {
    applySuiviFilters();
  }, [suiviArr]);

  useEffect(() => {
    const refresh = async () => {
      await fetchHistory(false, true);
    };

    refresh();
  }, [shouldUpdate]);

  const refreshAction = async () => {
    await fetchHistory(false, false, true);
    let newSuivi = historyArr.find((val) => val.id == suiviId);
    setSuiviArr(newSuivi.message.suivi);
  };
  const ResendAction = async () => {
    let dataToSend = {
      token: userInfo.access_token,
      messageorder: {
        texte_attache: suiviMeta.texte_attache,
        cours: suiviMeta.cours,
        users: displayedSuiviArr.map((value) => value.user),
        manager_id: userInfo?.current_user?.uid,
        groupe: {
          id: suiviMeta.groupe.id,
          nom: suiviMeta.groupe.nom,
          users: [null],
          cours: [null],
        },
        date_envoi: getUTCString(),
      },
    };
    console.log(dataToSend);

    let ret = await sendData(dataToSend);
    if (ret && ret.status == 200) {
      setShowPopup(true);
    } else {
      pushAlert({
        id: Date.now(),
        message: "réessayer plus tard",
        mode: "danger",
      });
    }
    // console.log(displayedSuiviArr.map((value) => value.user));
  };

  const showDetails = (ev) => {
    setSuiviId(ev.id);
    setSuiviMeta({
      texte_attache: ev.message.texte_attache,
      cours: ev.message.cours,
      groupe: ev.message.groupe,
    });
    setSuiviArr([...ev.message.suivi]);
    // setDisplayedSuiviArr([...ev.message.suivi]);
    setDetailsVisible(true);
  };
  const hideDetails = (e) => {
    // console.log("yeet");
    if (e.target == e.currentTarget) {
      setDetailsVisible(false);
      setSuiviArr([]);
      setSuiviMeta(null);
      setSuiviId(null);
      setSelectedFName(null);
      setSelectedLName(null);
      setSelectedMessageState(null);
    }
  };

  const fetchHistory = async (
    back = false,
    applyFilters = false,
    refresh = false
  ) => {
    if (detailsVisible) setModalLoading(true);
    else setIsLoading(true);
    let data;
    if (refresh) {
      data = await getHistory(
        page,
        undefined,
        filters.gid,
        filters.cid,
        filters.startDate,
        filters.endDate,
        userInfo.access_token,
        userInfo?.current_user?.uid
      );
    } else if (applyFilters) {
      data = await getHistory(
        0,
        undefined,
        filters.gid,
        filters.cid,
        filters.startDate,
        filters.endDate,
        userInfo.access_token,
        userInfo?.current_user?.uid
      );
    } else {
      data = await getHistory(
        back ? page - 1 : page + 1,
        undefined,
        filters.gid,
        filters.cid,
        filters.startDate,
        filters.endDate,
        userInfo.access_token,
        userInfo?.current_user?.uid
      );
    }
    if (!refresh) {
      if (applyFilters) {
        setPage(0);
      } else {
        setPage(back ? page - 1 : page + 1);
      }
    }
    // let data = null;
    if (data) {
      setNpage(data.totalPages);
      setHistoryArr(data.content);
    } else {
      pushAlert({
        id: Date.now(),
        message: "Une erreur s'est produite !",
        mode: "danger",
      });
    }
    setIsLoading(false);
    setModalLoading(false);
  };

  const handleNext = () => {
    console.log("next");
    fetchHistory();
  };

  const handlePrev = () => {
    console.log("prev");
    fetchHistory(true);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AnimatePresence>
        (
        {detailsVisible && (
          <Modal
            ariaHideApp={false}
            isOpen={detailsVisible}
            onRequestClose={hideDetails}
          >
            <motion.div
              className="bg-white"
              initial={{
                y: "10%",
                opacity: 0,
              }}
              animate={{
                y: "0vh",
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <div className="flex flex-row justify-between space-x-4">
                <div className="w-[15%] sticky top-8 h-fit  ">
                  <div
                    onClick={refreshAction}
                    className="flex flex-row items-center space-x-2 font-medium px-4 py-2 mb-2 text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="uppercase">Actualiser</div>
                  </div>
                  <div
                    onClick={() => setDetailsVisible(false)}
                    className="flex flex-row items-center space-x-2 font-medium px-4 py-2 mb-2 text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="uppercase">Fermer</div>
                  </div>
                  <div className="flex flex-col shadow border-b border-gray-200 rounded-sm p-4 bg-white space-y-4">
                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-lg font-medium text-gray-700 capitalize"
                      >
                        Filtrer par nom
                      </label>
                      <input
                        onChange={(val) => {
                          setSelectedLName(val.target.value.trim());
                        }}
                        value={selectedLName || ""}
                        type="text"
                        name="lname"
                        id="lname"
                        className="w-full rounded-md p-2 border-2 border-blue-300 focus:border-2 focus:border-blue-400 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-lg font-medium text-gray-700 capitalize"
                      >
                        Filtrer par prenom
                      </label>
                      <input
                        onChange={(val) => {
                          setSelectedFName(val.target.value.trim());
                        }}
                        value={selectedFName || ""}
                        type="text"
                        name="fname"
                        id="lfname"
                        className="w-full rounded-md p-2 border-2 border-blue-300 focus:border-2 focus:border-blue-400 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="cou rse"
                        className="block text-lg font-medium text-gray-700 capitalize"
                      >
                        Filtrer par etat message
                      </label>
                      <Select
                        ref={MessageStateRef}
                        isClearable
                        onChange={handleMessageState}
                        options={messageStateOptions}
                        placeholder={"Choisir..."}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="course"
                        className="block text-lg font-medium text-gray-700 capitalize"
                      >
                        Filtrer par etat cours
                      </label>
                      <Select
                        ref={CourseStateRef}
                        isClearable
                        onChange={handleCourseState}
                        options={courseStateOptions}
                        placeholder={"Choisir..."}
                      />
                    </div>
                    <div>
                      <div
                        onClick={applySuiviFilters}
                        className="w-full text-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 select-none inline-block py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Filtrer
                      </div>
                      <div
                        onClick={() => {
                          applySuiviFilters(null, true);
                        }}
                        className="w-full mt-2 text-center cursor-pointer bg-orange-600 hover:bg-orange-700 select-none inline-block py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Réinitialiser
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col shadow border-b border-gray-200 rounded-sm p-4 bg-white space-y-4">
                    <div>Actions</div>
                    <div
                      onClick={ResendAction}
                      className="flex flex-row items-center space-x-2 font-medium px-4 py-2 mb-2 text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="uppercase flex-grow">Renvoyer</div>
                      <div className="group cursor-help">
                        <div
                          id="tooltip-default"
                          role="tooltip"
                          className="hidden group-hover:z-50 group-hover:inline-block w-full absolute py-2 px-3 -translate-y-10 text-sm text-white bg-gray-900 rounded-lg shadow-sm"
                          // class="inline-block absolute py-2 px-3 text-sm font-medium  opacity-0 transition-opacity duration-300 dark:bg-gray-700"
                        >
                          Renvoie le message aux utilisateurs inclus dans le
                          filtre actuel.
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <table className="w-full divide-y shadow border-b border-gray-200 divide-gray-200 ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          prenom
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          nom
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          numero tel
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          etat message
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          date livraison
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          date réception
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          date lecture
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          avancement
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          dernière visite
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          temps passé
                        </th>
                      </tr>
                    </thead>
                    {!modalLoading ? (
                      <tbody className="bg-white divide-y divide-gray-200">
                        {displayedSuiviArr.map((val) => (
                          <tr
                            key={val.id_msg}
                            className="hover:bg-gray-300 cursor-pointer odd:bg-gray-100"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {val.user.prenom}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap shrink truncate">
                              {val.user.nom}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {val.user.numero_tel}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Badge
                                value={val.etat_message}
                                state={val.etat_message}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              {val.date_time_delivred || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              {val.date_time_recieved || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              {val.date_time_read || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Badge
                                value={val.action_cours}
                                state={val.action_cours}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              {val.date_time_visit || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              {val.duration
                                ? `${Math.floor(val.duration / 60)} min`
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : null}
                  </table>
                  {modalLoading ? <Loader /> : null}
                </div>
              </div>
            </motion.div>
          </Modal>
        )}
        )
      </AnimatePresence>
      <div className="w-full">
        <Pagination
          onNext={handleNext}
          onPrev={handlePrev}
          nPage={nPage}
          current={page}
        />
        <table className="w-full table-fixed divide-y shadow border-b border-gray-200 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                date
              </th>
              <th
                scope="col"
                className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                groupe
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                cours
              </th>
              <th
                scope="col"
                className="w-[50%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                message attaché
              </th>
              <th
                scope="col"
                className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                bénéficiaires
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyArr.map((val) => (
              <tr
                onClick={() => showDetails(val)}
                key={val.id}
                className="hover:bg-gray-300 cursor-pointer odd:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap truncate">
                  {val.message?.date_envoi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap truncate">
                  {val.message.groupe?.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap truncate">
                  {val.message.cours?.titre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                  {val.message.texte_attache}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm truncate">
                  {val.message.suivi?.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MessageHistory;
