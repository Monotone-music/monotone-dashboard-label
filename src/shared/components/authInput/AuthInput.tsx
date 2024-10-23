import React from 'react'
import styles from './styles.module.scss'
import { Input } from '@/components/ui/input'
import { UseFormRegister } from 'react-hook-form';


interface AuthInputProps {
    label: string;
    id: string;
    type: string;
    placeholder: string;
    register: UseFormRegister<any>; // or your specific form type
    error?: string; // Error message passed from the parent component

}
const AuthInput:React.FC<AuthInputProps> = ({label,register, type, placeholder, id, error}) => {
  return (
    <div className={styles['input-container']}>
    <label htmlFor={id} className={styles.label}>{label}</label>
    <Input {...register(id)}  type={type} placeholder={placeholder} style={error ? {borderColor: 'red'} : undefined} className={styles['input-form']}/>
    {error && <p className={styles['error-text']}>{error}</p>}
  </div>
  )
}

export default AuthInput