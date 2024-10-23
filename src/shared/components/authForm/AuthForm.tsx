import styles from './styles.module.scss'
import AuthInput from '../authInput/AuthInput'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


interface FormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
}).required();

const AuthForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({  resolver: yupResolver(schema)})

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data) // handle form submission logic here
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
   <AuthInput 
        label="Email" 
        id="email" 
        type="email" 
        placeholder="Enter your email" 
        register={register} 
        error={errors.email?.message}
      />
      
      <AuthInput 
        label="Password" 
        id="password" 
        type="password" 
        placeholder="Enter your password" 
        register={register} 
        error={errors.password?.message}
      />
      <div className={styles['forgot-password']}>
        <a href="/" className={styles.link}>Forgot password?</a>
      </div>

      <Button className={styles['submit-btn']}>Sign in</Button>
    </form>
  )
}

export default AuthForm