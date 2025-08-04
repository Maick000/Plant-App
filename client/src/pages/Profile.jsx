import { useEffect } from "react";
import { useAuth } from '../context/useAuthContext';
import {Button, TextForm, PlantFormContainer, ContainerFormProfile, DivContainerLogo} from '../components'
import { DiYii } from "react-icons/di";

const Profile = () => {
  const { getProfile, user, loading } = useAuth();

  useEffect(() => {
    if(loading) return;
    if(user){
      getProfile();
    }
  }, [user, loading]);

  if(loading) return <h1>Loading...</h1>;
  if (!user) return <div>Cargando perfil...</div>;

  return (
    <PlantFormContainer>
      <DivContainerLogo>
      <DiYii className="w-6 h-6 text-lime-800 mx-2" />
      <TextForm>PROFILE</TextForm>
      </DivContainerLogo>

      <div className="w-72 h-1 bg-lime-300 rounded-full justify-center"></div>

      <ContainerFormProfile>
      <TextForm>{user.name}</TextForm>
      </ContainerFormProfile>
      <ContainerFormProfile>
      <h3 className="text-xl text-lime-800 font-medium">@{user.username} </h3>
      </ContainerFormProfile>

      <ContainerFormProfile>
      <p className="text-sm text-lime-700 font-light italic"><strong>{user.email}</strong></p>
      </ContainerFormProfile>

      <div>
        <footer className="mt-4 flex gap-3">
            <div className="flex gap-x-2 items-center">
            <Button to={`/profile/${user.id}`}  >Update</Button>
            </div>
          </footer>
      </div>
    </PlantFormContainer>
  );
};

export default Profile;
