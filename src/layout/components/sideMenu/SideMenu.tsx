import styles from './styles.module.scss'
import SideBtn from './sideBtn/SideBtn'
import { PiHouseFill, PiHouseLight } from 'react-icons/pi'

const SideMenu = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
          <span>Monotone</span>
          <span>Studio</span>
        </div>

        <div className={styles['list-wrapper']}>
          <SideBtn icon={PiHouseLight} iconHovered={PiHouseFill} title='Home'/>
        </div>
    </div>
  )
}

export default SideMenu