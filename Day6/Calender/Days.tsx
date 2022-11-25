import styles from "./Calender.module.scss";
import SingleDays from "./SingleDay";

interface Props {
  weekDays: string[];
}

const Days: React.FC<Props> = ({ weekDays }) => {
  const label = {
    latest: "latest",
    highPrioriy: "highPriority",
    lowPriority: "lowPriority",
    marked: "marked",
  };

  return (
    <>
      <div className={styles.weekDays}>
        {weekDays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className={styles.days}>
        <SingleDays label={label.latest} event={""} num={1} />
        <SingleDays  num={1} />
        <SingleDays num={2} />
        <SingleDays num={3} />
        <SingleDays num={4} />
        <SingleDays label={label.highPrioriy} num={5} />
        <SingleDays num={6} />
        <SingleDays num={7} />
        <SingleDays num={8} />
        <SingleDays num={9} />
        <SingleDays num={10} />
        <SingleDays num={11} />
        <SingleDays num={12} />
        <SingleDays num={13} />
        <SingleDays num={14} />
        <SingleDays num={15} />
        <SingleDays num={16} />
        <SingleDays num={17} />
        <SingleDays num={18} />
        <SingleDays label={label.marked} event={"New work"} num={19} />
        <SingleDays num={20} />
        <SingleDays label={label.lowPriority} event={"New work"} num={21} />
        <SingleDays num={22} />
        <SingleDays num={23} />
        <SingleDays num={24} />
        <SingleDays num={25} />
        <SingleDays num={26} />
        <SingleDays num={27} />
        <SingleDays num={28} />
        <SingleDays num={29} />
        <SingleDays num={30} />
      </div>
    </>
  );
};

export default Days;
