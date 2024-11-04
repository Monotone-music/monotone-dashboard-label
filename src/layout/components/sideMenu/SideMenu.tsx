import styles from './styles.module.scss'
import SideBtn from './sideBtn/SideBtn'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import {HiUsers} from "react-icons/hi";
import { FaUser } from 'react-icons/fa6';

const SideMenu = () => {

  return (
    <div className={styles.container}>
        <div className={styles.logo}>
          <span>Monotone</span>
          <span>Studio</span>
        </div>

        <div className={styles['list-wrapper']}>
          <SideBtn icon={RiDashboardHorizontalFill} iconHovered={RiDashboardHorizontalFill} title='Overview' to='/admin/overview'/>
          <SideBtn icon={HiUsers} iconHovered={HiUsers} title='Accounts' to='/admin/accounts-management'/>
          <SideBtn icon={FaUser } iconHovered={FaUser } title='Profile' to='/admin/profile'/>
        </div>
    </div>
  )
}

export default SideMenu