import styles from "./styles.module.scss";
import TitlePage from "@/shared/components/titlePage/TitlePage";
import AnalyticCard from "@/shared/components/analyticCard/AnalyticCard";
import { IoMusicalNote } from "react-icons/io5";
import { IoTrendingUpOutline } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { OverviewChart } from "@/shared/components/overviewChart/OverviewChart";
import OverviewRankSong from "@/shared/components/overviewRankSong/OverviewRankSong";
const HomePage = () => {
  return (
    <div className={styles.container}>
      <TitlePage title={["Overview", "Dashboard"]} />

      <section className={styles["analytic-section"]}>
        <AnalyticCard
          iconColor="#4CAF50"
          icon={IoMusicalNote}
          title="Total Songs"
          mainNumber={10}
          unit="Songs"
        />
        <AnalyticCard
          iconColor="#2196F3"
          icon={IoTrendingUpOutline}
          title="Current Popularity"
          mainNumber={11}
          unit="# Rank"
        />

        <AnalyticCard
          iconColor="#FFC107"
          icon={FaRegUser}
          title="Followers"
          mainNumber={1000}
          unit="followers"
        />
        <AnalyticCard
          iconColor="#673AB7"
          icon={AiOutlineCheckCircle}
          title="Song Review Requests"
          mainNumber={2}
          unit="Songs Pending Review"
        />
      </section>

      <section className={styles["metrics-section"]}>
        <div className={styles["chart-section"]}>
          <TitlePage title={["Total Streams per Month"]} />
          <OverviewChart />
        </div>

        <div className={styles["top-section"]}>
          <TitlePage title={["Top Songs"]} />
          <OverviewRankSong />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
