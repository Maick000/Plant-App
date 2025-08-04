import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/useAuthContext'
import {Link, useNavigate} from 'react-router'
import { FaUser } from "react-icons/fa";
import { IoFingerPrintOutline } from "react-icons/io5";
import { TbPlant2 } from "react-icons/tb";
import {InputAuth, Form, Titles, Text, DivInput, DivContainer, DivContainerForm, DivInputContainer, PasswordInput, PasswordViewInput, ButtonAuthForm, TextError} from '../components';

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const togglerPasswordVisibility = () => setShowPassword(!showPassword);
  const {register, handleSubmit, formState: {errors},} = useForm()
  const {signin, error: signinErrors, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate()

  useEffect(()=> {
    if(loading) return <h1>Loading...</h1>
    if (isAuthenticated) navigate('/plants')
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  return (
    <DivContainer>
      <DivContainerForm>
      
        <TbPlant2 className="w-6 h-6 text-lime-800 mx-2"/>
        <Titles>Welcome to Plant Page!</Titles>
        <Text>Don't have an account? <Link to="/register" className='text-green-950'>Sign up</Link></Text>

        <DivInputContainer>
          <Form onSubmit={onSubmit}>

            <DivInput> 
              <FaUser className="text-lime-800 mx-2" />
              <InputAuth 
                type="email" 
                placeholder='Email account'
                {...register('email', {required: true})}
              />
            </DivInput>
            {errors.email && <TextError>Email is required</TextError>}

             <DivInput>
              <IoFingerPrintOutline className="text-lime-800 mx-2" />
              <InputAuth 
                type={showPassword ? "password" : "text"} 
                placeholder='Password' 
                {...register('password', {required: true})}
              />
              {showPassword ? <PasswordInput onClick={togglerPasswordVisibility} />: <PasswordViewInput onClick={togglerPasswordVisibility} />}
            </DivInput>

            {errors.password && <TextError>Password is required</TextError>}

            <ButtonAuthForm 
              type="submit" 
            >
              Login
            </ButtonAuthForm>
          </Form>
        </DivInputContainer>

        <div className='mt-2'>
          {signinErrors.map((error, index) => (
            <TextError key={index}>{error}</TextError>
          ))}
        </div>

        </DivContainerForm>
      </DivContainer>
  )
}

export default Login