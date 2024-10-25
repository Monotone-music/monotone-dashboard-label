import React from "react";
import styles from "./styles.module.scss";
import { IconType } from "react-icons";

interface AnalyticCardProps {
    title: string;
    mainNumber: string | number;
    dateRange?: string;
    icon: IconType;
    iconColor: string;
    unit: string;
}

const AnalyticCard:React.FC<AnalyticCardProps> = ({title, mainNumber, dateRange, icon, iconColor, unit}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        {dateRange && <div className={styles.date}>{dateRange}</div>}
      </div>

      <div className={styles.bottom}>
        <div className={styles.icon} style={{color: iconColor}}>
            {React.createElement(icon)}
        </div>
        <div className={styles["main-number"]}>{mainNumber} <span className={styles.unit}>{unit}</span></div>
      </div>
    </div>
  );
};

export default AnalyticCard;
