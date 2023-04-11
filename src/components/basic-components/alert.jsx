import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Alert = (props) => {
  switch (props?.mode) {
    case "info":
      return (
        <motion.div
          initial={{ opacity: 0, y: "-5vw" }}
          animate={{ opacity: 1, y: "0vw", transition: 0.3 }}
          exit={{ opacity: 0 }}
          className="cursor-pointer p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
          role="alert"
        >
          <span className="font-medium">Note!</span> {props?.message || ""}
        </motion.div>
      );
    case "danger":
      return (
        <motion.div
          initial={{ opacity: 0, y: "-5vw" }}
          animate={{ opacity: 1, y: "0vw", transition: 0.3 }}
          exit={{ opacity: 0, x: "5vw" }}
          className="cursor-pointer p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Erreur!</span> {props?.message || "Error occured please try again later"}
        </motion.div>
      );
    case "success":
      return (
        <motion.div
          initial={{ opacity: 0, y: "-5vw" }}
          animate={{ opacity: 1, y: "0vw", transition: 0.3 }}
          exit={{ opacity: 0 }}
          className="cursor-pointer p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Succès!</span> {props?.message || "Action successful"}
        </motion.div>
      );
    case "warning":
      return (
        <motion.div
          initial={{ opacity: 0, y: "-5vw" }}
          animate={{ opacity: 1, y: "0vw", transition: 0.3 }}
          exit={{ opacity: 0 }}
          className="cursor-pointer p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
          role="alert"
        >
          <span className="font-medium">Avertissement!</span> {props?.message || "Something wrong happened"}
        </motion.div>
      );

    default:
      return (
        <motion.div
          initial={{ opacity: 0, y: "-5vw" }}
          animate={{ opacity: 1, y: "0vw", transition: 0.3 }}
          exit={{ opacity: 0 }}
          className="cursor-pointer p-4 mb-4 text-sm text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-700"
          role="alert"
        >
          <span className="font-medium">Note!</span> {props?.message || ""}
        </motion.div>
      );
  }
};

export default Alert;
