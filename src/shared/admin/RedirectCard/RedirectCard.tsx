import styles from './styles.module.scss'
import TitlePage from '@/shared/components/titlePage/TitlePage'
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

interface RedirectCardProps {
  title: string[];
  to: string;
}

const RedirectCard:React.FC<RedirectCardProps> = ({title, to}) => {
  return (
    <NavLink to={to} className={styles.container}>
        <TitlePage title={title}/>
        <div className={styles.bottom}>
            <FaLongArrowAltRight size={20}/>
        </div>
    </NavLink>
  )
}

export default RedirectCard