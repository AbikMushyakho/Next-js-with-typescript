import { useState } from "react";
import styles from "./Calender.module.scss";

interface Props {
  num: number;
  label?: string;
  event?: string;
}

const SingleDays: React.FC<Props> = ({ num, label, event }) => {
  const [isHovering, setIsHovering] = useState(false);
  let labelStyle: string = "transparent";
  if (label === "latest") {
    labelStyle = "skyblue";
  } else if (label === "highPriority") {
    labelStyle = "yellow";
  } else if (label === "lowPriority") {
    labelStyle = "red";
  } else if (label === "marked") {
    labelStyle = "orange";
  } else {
    labelStyle = "transparent";
  }

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      style={{
        backgroundColor: isHovering ? "gray" : labelStyle,
        cursor: "pointer",
      }}
      className={styles.singleDays}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {num}
    </div>
  );
};

export default SingleDays;
