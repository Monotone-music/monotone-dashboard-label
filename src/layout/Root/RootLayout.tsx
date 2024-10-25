import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/sideMenu/SideMenu";

const RootLayout = () => {
  return (
    <div className={styles.container}>
      <SideMenu />
      <section className={styles.main}>
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
