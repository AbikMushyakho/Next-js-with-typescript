import React from "react";
import { motion } from "framer-motion";
import styles from "../backdrop/backdrop.module.scss";
interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Backdrop: React.FC<Props> = ({ children, onClick }) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
