import styles from "./styles.module.scss";
import SideBtn from "./sideBtn/SideBtn";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaFileAudio, FaMusic, FaUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import LogoutButton from "../logoutButton/LogoutButton";

const SideMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <span>Monotone</span>
          <span>
            Studio <span className={styles.role}>label</span>
          </span>
        </div>

        <div className={styles["list-wrapper"]}>
          <SideBtn
            icon={RiDashboardHorizontalFill}
            iconHovered={RiDashboardHorizontalFill}
            title="Overview"
            to="/label/overview"
          />
          <SideBtn
            icon={FaFileAudio}
            iconHovered={FaFileAudio}
            title="Upload"
            to="/label/uploader"
          />
           <SideBtn
            icon={FaMusic}
            iconHovered={FaMusic}
            title="Track Manager"
            to="/label/manager"
          />
          <SideBtn
          icon={FaUser}
          iconHovered={FaUser}
          title="Artist Manager"
          to="/label/artist"
          />
          <SideBtn
          icon={FaFileAudio}
          iconHovered={FaFileAudio}
          title="Audio Approval"
          to="/label/audio-approval"
          />
        </div>
      </div>
      <div className={styles.bottom}>

        <div className={styles["list-wrapper"]}>
          <LogoutButton
            icon={FiLogOut}
            iconHovered={FiLogOut}
            title="Logout"
            to="/auth/sign-in"
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
