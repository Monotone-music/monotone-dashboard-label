import React, { useState } from 'react'
import styles from './styles.module.scss'
import { IconType } from 'react-icons'

interface SideBtnProps {
  icon: IconType;
  iconHovered: IconType;
  title: string;
  onClick?: () => void;
}

const SideBtn:React.FC<SideBtnProps> = ({icon,iconHovered , title, onClick}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={styles.container} 
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
    >
        <div className={styles.icon}>
            {isHover ? React.createElement(iconHovered) : React.createElement(icon) }
        </div>
        <div className={styles.title}>{title}</div>
    </div>
  )
}

export default SideBtn