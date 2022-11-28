import { FaBehance, FaDribbble } from "react-icons/fa";
import { IoMailOutline, IoChevronForwardCircle, IoStar } from "react-icons/io5";

import { IconContext } from "react-icons";
import styles from "styles/portfolio.module.scss";

const Index = () => {
  return (
    <div>
      <header>
        <div className={styles.logo_wrapper}>
          dev<span>Abik</span>
        </div>
        <div className={styles.menu_container}>
          <span>
            <IconContext.Provider
              value={{
                color: "#000",
                size: "18px",
                className: "icons_container",
              }}
            >
              <div className={styles.icon}>
                <FaBehance />
              </div>
              <div className={styles.icon}>
                <FaDribbble />
              </div>
            </IconContext.Provider>
          </span>
          <span>
            <IconContext.Provider
              value={{
                color: "#000",
                size: "18px",
              }}
            >
              <div className={styles.icon}>
                <IoMailOutline />
              </div>
              hello@example.co
            </IconContext.Provider>
          </span>
          <span className={styles.menu}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </header>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContentWrapper}>
          <h2>
            <span>Designed focused</span>
            <span>Startup for startups.</span>
          </h2>
          <p>I am abik mushyakho, I am a passionated frontend developer.</p>
        </div>
        <div className="rightContentWrapper"></div>
      </div>
    </div>
  );
};

export default Index;
