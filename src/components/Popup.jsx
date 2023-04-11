import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Popup = () => {
  const { setShowPopup } = useContext(AppContext);

  const handleClose = (e) => {
    if (e.target == e.currentTarget) {
      setShowPopup(false);
    }
  };

  return (
    <div className="relative z-10" role="dialog">
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div onClick={handleClose} className="flex items-end bg-indigo-800 bg-opacity-50 sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <motion.div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl max-w-lg w-full" initial={{ y: "-10vh", opacity: 0 }} animate={{ y: "0vh", opacity: 1 }}>
            <motion.div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="sm:flex sm:items-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className=" text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 -mt-1 font-medium text-gray-900" id="modal-title">
                    Message envoyé
                  </h3>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">Your message was sent successfully !.</p>
                  </div> */}
                </div>
              </div>
            </motion.div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => setShowPopup(false)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Ok
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
