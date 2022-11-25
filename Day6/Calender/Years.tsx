import styles from "./Calender.module.scss";

interface Props {
  years: number[];
}

const Years: React.FC<Props> = ({ years }) => {
  return (
    <div className={styles.years}>
      {years.map((year, index) => (
        <button key={year}>{year}</button>
      ))}
    </div>
  );
};

export default Years;
