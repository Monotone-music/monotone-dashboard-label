import { toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/toastStyles.module.scss';

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut"
});

const triggerToast = (message: string, type: "success" | "error" = "success") => {
  toast(message, {
    position: "bottom-right",
    autoClose: 2000,
    transition: bounce,
    progressStyle: { background: "white"},
    style: {
      backgroundColor: type === "success" ? "green" : "red",
      color: "white",
      fontWeight: 700,
    },
  });
};

export default triggerToast;