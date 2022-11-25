import { useState } from "react";
import styles from "./Calender.module.scss";
import Days from "./Days";
import Months from "./Months";
import Years from "./Years";

const Calender = () => {
  const monthsInYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [
    2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [showDetails, setShowDetails] = useState({
    monthYear: true,
    year: false,
    yearRange: false,
  });

  return (
    <div className={styles.calender}>
      <div className={styles.top}>
        <button>{"<<"}</button>
        <button>{"<"}</button>
        <button
          className={styles.dateButton}
          onClick={(e) =>
            setShowDetails(
              showDetails.monthYear
                ? { ...showDetails, monthYear: false, year: true }
                : showDetails.year
                ? { ...showDetails, year: false, yearRange: true }
                : {
                    monthYear: true,
                    year: false,
                    yearRange: false,
                  }
            )
          }
        >
          {showDetails.monthYear
            ? `${
                monthsInYear[new Date().getMonth()]
              }  ${new Date().getFullYear()}`
            : showDetails.year
            ? `${new Date().getFullYear()}`
            : `${years[0]} - ${years[years.length - 1]}`}
        </button>
        <button>{">"}</button>
        <button>{">>"}</button>
      </div>

      {showDetails.yearRange ? (
        <Years years={years} />
      ) : showDetails.year ? (
        <Months monthsInYear={monthsInYear} />
      ) : (
        <Days weekDays={weekDays} />
      )}
    </div>
  );
};

export default Calender;
