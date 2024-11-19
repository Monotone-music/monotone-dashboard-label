
import styles from './styles.module.scss'

interface AuthHeadingProps {
  role?: string;
}

const AuthHeading: React.FC<AuthHeadingProps>= ({role}) => {
  return (
    <div className={styles.heading}>
    <div className={styles.title}>
      <span>Welcome to Monotone Studio for <span className={styles.notation}>{role}</span>,</span>
      <span>Sign In to Continue</span>
    </div>
    {/* <div className={styles.description}>
      <div>
        Don't have an account?
        <a href="" className={styles.link}>
          Create a account
        </a>
      </div>
      <span>It takes less than a minute</span>
    </div> */}
  </div>
  )
}

export default AuthHeading