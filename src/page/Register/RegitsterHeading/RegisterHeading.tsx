import styles from './styles.module.scss'

interface RegisterHeadingProps {
  role?: string;
}

const RegisterHeading: React.FC<RegisterHeadingProps> = ({role}) => {
  return (
    <div className={styles.heading}>
      <div className={styles.title}>
        <span>Join Monotone Studio as a <span className={styles.notation}>{role}</span>,</span>
        <span>Create Your Account</span>
      </div>
      {/* <div className={styles.description}>
        <div>
          Already have an account?
          <a href="/auth/login" className={styles.link}>
            Sign in here
          </a>
        </div>
        <span>It only takes a few minutes to get started</span>
      </div> */}
    </div>
  )
}

export default RegisterHeading
