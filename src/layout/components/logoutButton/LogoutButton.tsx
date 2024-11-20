import React, { useState } from 'react'
import styles from './styles.module.scss'
import { IconType } from 'react-icons';
import { useLogout } from '@/service/mutations/logoutMutation';
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
    icon: IconType;
    iconHovered: IconType;
    title: string;
    to: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({icon, iconHovered, title, to}) => {
    const [isHover, setIsHover] = useState(false);
    const logout = useLogout(); 

    const navigate = useNavigate(); 
    const { toast } = useToast()

    const handleLogout = () => {
        logout(); // Clear user data
        navigate(to, { replace: true });
        toast({
            variant: "default",
            duration: 3000,
            title: "Logout successfully",
            description: "See you again!",
            className: styles['toast-primary']
          })
    }
    

    return (
      <div className={styles.container} 
      onClick={handleLogout}
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

export default LogoutButton