import AxiosConfiguration from './AxiosConfiguration';

export const registerRequest= user =>  AxiosConfiguration.post('/api/auth/register', user);

export const loginRequest = user => AxiosConfiguration.post('/api/auth/login', user)

export const verifyTokenRequest = () => AxiosConfiguration.get('/api/auth/verify')

export const getProfileRequest= () => AxiosConfiguration.get('api/auth/profile')

export const getProfileByIdRequest = (id) => AxiosConfiguration.get(`api/auth/profile/${id}`)

export const updateProfileRequest= (id, profile) => AxiosConfiguration.patch(`api/auth/profile/${id}`, profile)

export const logoutRequest = () => AxiosConfiguration.post("api/auth/logout")