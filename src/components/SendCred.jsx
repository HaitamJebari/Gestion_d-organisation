import { motion } from "framer-motion";

const SendCred = () => {
  return (
    <motion.div
      className="p-4 w-3/4 mx-auto rounded-md ring-1 mt-4 shadow-lg shadow-gray-300"
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw", transition: 0.3 }}
    >
      <div>This is the send creds page</div>
    </motion.div>
  );
};

export default SendCred;
