import styles from "./styles.module.scss";
import TitlePage from "@/shared/components/titlePage/TitlePage";
import AnalyticCard from "@/shared/components/analyticCard/AnalyticCard";
import { IoEye } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaMusic, FaRegUser } from "react-icons/fa6";
import { OverviewChart } from "@/shared/components/overviewChart/OverviewChart";
import OverviewRankSong from "@/shared/components/overviewRankSong/OverviewRankSong";
import { useEffect, useState } from "react";
import { getLabelAnalytics } from "@/service/dashboardService";
import PuffLoader from "react-spinners/PuffLoader";
const HomePage = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLabelAnalytics();
        setData(res);
        
        // Handle the response here
      } catch (error) {
        console.log(error);
      }
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const totalTracks = data?.recordingCount.available || 0;
  const rejectedTracks = data?.recordingCount.reject || 0;
  const pendingTracks = data?.recordingCount.pending || 0;
  const totalViews = data?.totalViews || 0;

  return (
    <div className={styles.container}>
      <TitlePage title={["Overview", "Dashboard"]} />

      <section className={styles["analytic-section"]}>
      {isLoading ? (
          Array(4).fill(null).map((_, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md">
              <PuffLoader size={40} />
            </div>
          ))
        ) : (
          <>
        <AnalyticCard
          iconColor="#4CAF50"
          icon={FaMusic}
          title="Total Tracks"
          mainNumber={totalTracks}
          unit="Track(s)"
        />
        <AnalyticCard
          iconColor="#2196F3"
          icon={IoEye}
          title="Total Views"
          mainNumber={totalViews}
          unit="View(s)"
        />

        <AnalyticCard
          iconColor="#FFC107"
          icon={FaRegUser}
          title="Rejected Requests"
          mainNumber={rejectedTracks}
          unit="Request(s)"
        />
        <AnalyticCard
          iconColor="#673AB7"
          icon={AiOutlineCheckCircle}
          title="Pending Requests"
          mainNumber={pendingTracks}
          unit="Request(s)"
        />
        </>
      )}
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
