import styles from "./styles.module.scss";
import img from "../../assets/img/authPageImg2.jpg";
import RegisterForm from "./RegisterForm/RegisterForm";
import RegisterHeading from "./RegitsterHeading/RegisterHeading";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["img-wrapper"]}>
        <img src={img} alt="" />
      </div>
      <div className={styles["content-wrapper"]}>
        <RegisterHeading role="Label Registration" />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
