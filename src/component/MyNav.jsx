import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useState } from "react";
export const navigation = [
  {
    text: "tv shows",
    href: "tv",
    icon: <i className="fa-solid fa-tv"></i>,
  },
  {
    text: "movies",
    href: "movie",
    icon: <i className="fa-solid fa-video"></i>,
  },
];

export const mobileNavigation = [
  {
    text: "Home",
    href: "/",
    icon: <i className="fa-solid fa-house"></i>,
  },
  ...navigation,
];

const MyNav = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${searchInput}`);
  }
  return (
    <header className="fixed z-[99] w-full py-5 bg-black bg-opacity-70 backdrop-blur-xl">
      <div className="container">
        <div className="row">
          <Link to={"/"} className="logo">
            <img
              src={logo}
              className="w-[70px] md:w-[130px]"
              alt="image logo"
            />
          </Link>
          <ul className="flex items-center">
            {navigation.map((nav, index) => {
              return (
                <li key={index} className="px-3 hidden md:block">
                  <NavLink
                    className="capitalize text-[20px] hover:text-neutral-100"
                    to={nav.href}
                  >
                    {nav.text}
                  </NavLink>
                </li>
              );
            })}
            <li className="mx-1 md:mx-5">
              <form
                action=""
                className="flex items-center"
                onSubmit={handleSubmit}
              >
                <input
                  type="search"
                  className="block w-full md:px-4 py-[6px] md:py-2 ps-2 md:ps-4 text-sm text-white bg-[#a7a9081f] focus:bg-[#a7a9081f] border border-none outline-none rounded-sm"
                  placeholder="Search Movies..."
                  required
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="ms-2">
                  <i className="fa-solid fa-magnifying-glass text-white"></i>
                </button>
              </form>
            </li>
            <li className="w-7 md:w-9 h-7 md:h-9 rounded-full overflow-hidden ms-3 cursor-pointer active:scale-50 transition-all">
              <img src={user} className="w-full h-full" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default MyNav;
