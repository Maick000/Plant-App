import { useState } from "react";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GiPlantRoots } from "react-icons/gi";
import { useAuth } from "../context/useAuthContext";
import { usePlants } from "../context/usePlantsContext";
import { Button, ButtonAuthForm } from '../components';

const NavBar = () => {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const { clearPlants } = usePlants();
  const [isOpen, setIsOpen] = useState(false);

  const authNavItems = [
    { id: 1, name: "Plants", path: "/plants" },
    { id: 2, name: "Add Plants", path: "/add-plants" },
    { id: 3, name: "Profile", path: "/profile" },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <>
    <nav className="bg-lime-800 my-3 py-3 rounded-lg fixed w-full top-4 left-0 z-50 shadow-lg md:left-1/2 md:-translate-x-1/2 justify-between md:w-[80%]">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6 md:px-10">
        <Link
          to="/"
          className="text-3xl font-semibold text-lime-300 flex items-center gap-x-2 hover:text-lime-200"
        >
          <GiPlantRoots size={28} />
          Plant App
        </Link>

        <button
          onClick={toggleNavbar}
          className="md:hidden text-lime-300 hover:text-lime-200 focus:outline-none"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}>
          {isOpen ? <IoMdClose size={28} /> : <FaBars size={24} />}
        </button>

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-lime-800 shadow-lg transform transition-transform duration-300 ease-in-out
            md:static md:w-auto md:h-auto md:shadow-none md:transform-none 
            ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}>

          <div className="flex justify-end p-4 md:hidden">
            <IoMdClose
              size={28}
              className="text-lime-300 cursor-pointer hover:text-lime-200"
              onClick={() => setIsOpen(false)}/>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 py-6 px-6 md:p-0">
            {isAuthenticated && user?.username && (
              <p className="text-center text-lime-200 font-light italic md:mr-4">
                Welcome <strong className="font-black">{user.username}</strong>!
              </p>
            )}

            <ul className="flex flex-col md:flex-row items-center gap-6">
              {isAuthenticated &&
                authNavItems.map((item) => (
                  <li key={item.id}>
                    <Button to={item.path} onClick={() => setIsOpen(false)}>
                      {item.name}
                    </Button>
                  </li>
                ))}
            </ul>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-6 md:mt-0">
              {isAuthenticated ? (
                <ButtonAuthForm
                  onClick={() => {
                    logout();
                    clearPlants();
                    setIsOpen(false);
                  }}>
                  Logout
                </ButtonAuthForm>
              ) : (
                <>
                  <Button to="/register" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Button>
                  <Button to="/login" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div style={{ height: '155px' }}></div>
    </>
  );
};

export default NavBar;
