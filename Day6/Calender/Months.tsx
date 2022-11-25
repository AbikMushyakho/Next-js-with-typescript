import styles from "./Calender.module.scss";

interface Props {
  monthsInYear: string[];
}

const Months: React.FC<Props> = ({ monthsInYear }) => {
  return (
    <div className={styles.yearMonths}>
      {monthsInYear.map((month, index) => (
        <button key={month}>{month}</button>
      ))}
    </div>
  );
};

export default Months;
