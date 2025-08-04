import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuthContext";
import { useNavigate, Link } from "react-router";
import { TbPlant2 } from "react-icons/tb";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsFilePersonFill, BsFileLock } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import {InputAuth, Form, Titles, Text, DivInput, DivContainer, DivContainerForm, DivInputContainer, PasswordInput, PasswordViewInput, ButtonAuthForm, TextError} from '../components';

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const togglerPasswordVisibility = () => setShowPassword(!showPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    signup,
    isAuthenticated,
    error: registerErrors,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/plants");
  }, [isAuthenticated, navigate]);

 const onSubmit = handleSubmit(async (values) => { await signup(values) })

  return (
    <DivContainer>
      <DivContainerForm>

      {registerErrors.map((error, index) => (
        <TextError key={index}>
          {error}
        </TextError>
      ))}

      <TbPlant2 className="w-6 h-6 text-lime-800 mx-2"/>
      <Titles>Register to Plant Page!</Titles>

      <DivInputContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <DivInput>
        <BsFilePersonFill className="text-lime-800 mx-2" />
        <InputAuth
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        </DivInput>

        {errors.name && <TextError>Name is required</TextError>}

        <DivInput>
        <FaUser className="text-lime-800 mx-2" />
        <InputAuth
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        </DivInput>

        {errors.username && (
          <TextError>Username is required</TextError>
        )}

        <DivInput>
        <AiOutlineGoogle className="text-lime-800 mx-2" />
        <InputAuth
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        </DivInput>

        {errors.email && (
          <TextError>Email is required</TextError>
        )}

        <DivInput>
            <BsFileLock className="text-lime-800 mx-2" />
            <InputAuth
              type={showPassword ? "password" : "text"} 
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {showPassword ? <PasswordInput onClick={togglerPasswordVisibility} />: <PasswordViewInput onClick={togglerPasswordVisibility} />}
        </DivInput>

            {errors.password && (
              <TextError>Password is required</TextError>
            )}
          

        <ButtonAuthForm
          type="submit"
        >
          Register
        </ButtonAuthForm>
      </Form>
      </DivInputContainer>

      <Text>
        Already have an account?{" "}
        <Link to="/login" className="text-green-950">
          Sing up
        </Link>
      </Text>
      </DivContainerForm>
    </DivContainer>
  );
};

export default Register;
