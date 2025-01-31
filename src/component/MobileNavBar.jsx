import { NavLink } from "react-router-dom";
import { mobileNavigation } from "./MyNav";

const MobileNavBar = () => {
  return (
    <div className="md:hidden py-4 bg-black bg-opacity-70 backdrop-blur-xl fixed w-full bottom-0">
      <div className="container">
        <div className="row">
          {mobileNavigation.map((nav, index) => {
            return (
              <NavLink
                to={nav.href}
                key={index}
                className="text-[18px] text-center hover:text-neutral-100"
              >
                <p className="">{nav.icon}</p>
                <p className="capitalize">{nav.text}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
