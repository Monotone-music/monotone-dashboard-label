import React from 'react'
import styles from './styles.module.scss'

interface AccountsMobileCard {
    firstName?: string;
    lastName?: string;
    img?: string;
}

const AccountsMobileCard:React.FC<AccountsMobileCard> = ({firstName, lastName, img}) => {
  return (
    <div className={styles.container}>
        <div className={styles['img-wrapper']}>
            <img src="https://github.com/shadcn.png" alt="" />
        </div>

        <div className={styles['info-wrapper']}>
            <div className={styles['last-name']}>{lastName}</div>
            <div className={styles['first-name']}>{firstName}</div>
       
        </div>
    </div>
  )
}

export default AccountsMobileCard