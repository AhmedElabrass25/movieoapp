import { Link } from "react-router-dom";
import img from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-neutral-900 shadow-lg text-neutral-200 py-3">
      <div className="container ">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full mb-1">
            <Link to="/" className="w-full">
              <img src={img} alt="Logo" className="w-28 mr-3" />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="w-full mb-3">
            <ul className="w-full flex items-center justify-center gap-10">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white text-[18px]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white text-[18px]"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="w-full text-center capitalize text-[20px] tracking-[1px]">
          Created by * Ahmed mohamed *
        </p>
      </div>
    </footer>
  );
};

export default Footer;
