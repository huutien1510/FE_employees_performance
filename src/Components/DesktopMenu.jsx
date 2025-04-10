import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";

const DesktopMenu = ({ menuItems }) => {
  const user = localStorage.getItem('user');
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openedMenus, setOpenedMenus] = useState({});
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();


  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const performSearch = (keyword) => {
    if (keyword.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  // Use debounced search function
  const debouncedSearch = useCallback(debounce(performSearch, 1000), []);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);
    debouncedSearch(keyword);
  };

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
    if (!showSearch) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setShowSearch(false);
      setSearchText("");
    }
  }, [location.pathname]);


  const toggleMenu = (menuName) => {
    setOpenedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleLogout =() =>{
    localStorage.removeItem("user");
    navigate(`/login`);
    return;
  }


  return (
    <div className="hidden md:flex items-center space-x-4 relative">
      {/* Wrapper for menu and search */}
      <div className={`flex items-center transition-all duration-300 ${showSearch ? "mr-64" : "mr-0"}`}>
        {/* Menu Items */}
        {
          menuItems.map((item) => (
            <div key={item.name} className="relative group">
              {
                <NavLink
                  to={item.href}
                  className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-bold tracking-wide"
                >
                  {item.name}
                </NavLink>
              }
            </div>
          ))}
      </div>

      {/* Search Section */}
      <div className="relative flex items-center">
        {/* Search Input */}
        <div
          className={`absolute top-[-10px] right-0 transition-all duration-300 ease-in-out ${showSearch ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
          style={{ overflow: "hidden" }}
        >
          <div className="relative">
            <input
              type="search"
              placeholder="Nhap ten nhan vien"
              value={searchText}
              onChange={handleSearchChange} // Debounced search
              className="py-2 pl-4 pr-10 bg-gray-800 text-white rounded-2xl w-full"
              ref={inputRef}
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="text-white hover:text-emerald-500 focus:outline-none relative z-10 mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* Auth Buttons */}
      {user ? (
        <>
          <Link to="/account/profile" className="text-emerald-500 text-sm">
            Hi, <span>{user}</span>
          </Link>
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-emerald-600 transition-colors"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </>
      ) : (

          <NavLink to={"/login"}>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-emerald-600 transition-colors">
              Đăng nhập
            </button>
          </NavLink>
      )}
    </div>
  );
};

export default DesktopMenu;