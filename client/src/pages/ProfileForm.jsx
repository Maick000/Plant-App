import {useForm} from 'react-hook-form'
import {useAuth} from '../context/useAuthContext'
import { useParams, useNavigate } from 'react-router'
import { useEffect } from "react";
import {Input, PlantFormContainer, Label, ButtonForm, PlantForm, TextForm, TextError, DivContainerLogo} from '../components';
import { BsPersonGear } from "react-icons/bs";

const ProfileForm = () => {
  const {register, handleSubmit, setValue, formState: { errors },
  } = useForm()
  const {getProfileById, updateProfile, error: registerErrors } = useAuth()
  const navigate = useNavigate();
  const params = useParams();

useEffect(() => {
  async function fetchProfile() {
    if (params.id) {
      const user = await getProfileById(params.id);
      if (user) {
        setValue("name", user.name);
        setValue("username", user.username);
        setValue("email", user.email);
      }
    }
  } 
  fetchProfile();
}, [params.id, setValue]);

  const onSubmit = handleSubmit(async (values) => {
        const res = await updateProfile(params.id, values);
        if (res) {
          return navigate('/profile');}
    });

  return (
    <PlantFormContainer>
        {registerErrors.map((error, index) => (
        <TextError key={index}>
          {error}
        </TextError>
      ))}

      <DivContainerLogo>
      <BsPersonGear className="w-6 h-6 text-lime-800 mx-2" />
      <TextForm>Update Profile</TextForm>
      </DivContainerLogo>

      <PlantForm onSubmit={onSubmit}>
        <div>
        <Label htmlFor="name">
              Name
        </Label>
        <Input type="text" placeholder='Name'
        {...register('name', { required: true })} 
        />

        {errors.name && (
              <TextError>
                Name is required
              </TextError>
          )}
        </div>
        
        <div>
        <Label htmlFor="username">
              Username
        </Label>
        <Input type="text" placeholder='Username'
        {...register('username', { required: true })}
        />

        {errors.username && (
              <TextError>
                Username is required
              </TextError>
            )}
        </div>
        
        <div>
        <Label htmlFor="email">
              Email
        </Label>
        <Input type="email" placeholder='Email'
        {...register('email', { required: true })}
        />

        {errors.email && (
              <TextError>
                Email is required
              </TextError>
            )}
        </div>

        <ButtonForm type="submit">
          Update Profile
        </ButtonForm>
      </PlantForm>
    </PlantFormContainer>
  )
}

export default ProfileForm