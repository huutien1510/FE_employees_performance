import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DesktopMenu from "./DesktopMenu.jsx";
import { useAuth } from "../Auth/AuthProvider.jsx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [genre, setGenre] = useState([])
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await fetch(`${baseURL}/genres/getAll`);
        const json = await response.json();
        setGenre(json.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchGenre();
  }, []);

  const menuItems = [
    { name: "Assessment", href: "/assessment" },
    { name: "Review", href: "/review" },
    { name: "Cuộc thi", href: "/contests" },
    { name: "Tin tức", href: "/blogs" },
  ];


  return (
    <nav className="bg-black/50 backdrop-blur-md fixed w-full top-0 z-50 mb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to={"/"} className="flex-shrink-0">
           <img src="./src/assets/homelogo.png" alt="home" className="w-32 h-32 object-contain"/>
          </NavLink>

          {/* Desktop Menu */}
          <DesktopMenu menuItems={menuItems} />

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Header;