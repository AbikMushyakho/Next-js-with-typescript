import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/demo">Demo</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
