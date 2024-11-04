import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/sideMenu/SideMenu";
import useLoadingStore from "@/store/useLoadingStore";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import useMediaQuery from "@/util/useMediaQuery";
import DropdownMenu from "../components/dropdownMenu/DropdownMenu";

const RootLayout = () => {
  const { loading } = useLoadingStore();
  const isMobile = useMediaQuery('(max-width: 766px)');
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
           <div className={`${styles.container}`}>
          {isMobile ? <DropdownMenu/> :  <SideMenu />}
      
          <section className={styles.main}>
            <Outlet />
          </section>
        </div>
      )}
    </>
  );
};

export default RootLayout;
