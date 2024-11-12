import React from 'react'
import styles from './styles.module.scss'

interface AccountsMobileCard {
    displayName?: string;
    username? :string
    img?: string;
}

const AccountsMobileCard:React.FC<AccountsMobileCard> = ({displayName, username, img}) => {
  return (
    <div className={styles.container}>
        <div className={styles['img-wrapper']}>
            <img src="https://github.com/shadcn.png" alt="" />
        </div>

        <div className={styles['info-wrapper']}>
            <div className={styles['last-name']}>{username}</div>
            <div className={styles['first-name']}>{displayName}</div>
       
        </div>
    </div>
  )
}

export default AccountsMobileCard