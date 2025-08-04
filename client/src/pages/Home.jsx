import monsteraImg from '../assets/plant.jpg'
import { TbPlant2 } from "react-icons/tb";
import { Link } from "react-router"
import {useAuth} from "../context/useAuthContext"
import {DivContainerForm} from '../components'

const Home = () => {
  const {isAuthenticated} = useAuth()

  return (
     <div className="min-h-screen bg-lime-50 flex">
      <DivContainerForm>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-8">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-5xl font-bold text-lime-950 tracking-tight">
              PLANT PAGE
            </h1>
            <TbPlant2 className="w-10 h-10 text-lime-800" />
          </div>

          <div className="space-y-4 text-lime-950/90">
            <p className="text-lg leading-relaxed">
              Plant Web is an innovative web application designed to help plant enthusiasts effortlessly track and manage their plant collections. With this intuitive platform, users can register their plants, store essential details (such as species, watering schedules, and care requirements), and maintain a digital catalog of their greenery. Whether you're a seasoned gardener or a beginner, Plant Web simplifies plant care by providing organized, accessible information about each plant in your collection. Discover a smarter way to nurture your plants with Plant Web!
            </p>
          </div>

          <Link to={isAuthenticated ? "/plants" : "/login"} className="px-8 py-3 bg-lime-900 hover:bg-lime-950 text-white font-medium rounded-full transition-colors shadow-lg hover:shadow-xl">
            Discover
          </Link>
        </div>
      </div>
    </DivContainerForm>
      <div className="hidden md:block md:w-1/2 bg-lime-50">
        <img 
          src={monsteraImg}
          alt="Monstera plant"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Home