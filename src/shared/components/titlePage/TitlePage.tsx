import React from 'react'
import styles from './styles.module.scss'

interface TitlePageProps {
    title: string[];
}

const TitlePage:React.FC<TitlePageProps> = ({title}) => {
  return (
    <div className={styles.container}>
        {title.map((item, index) => (
            <div className={styles.text} key={index}>{item}</div>
        ))}
    </div>
  )
}

export default TitlePage