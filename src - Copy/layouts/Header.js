import { useUser } from "../hooks/useUser";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const { userProfile } = useUser();

  return (
    <header className="top-0 z-20 mx-auto flex w-full items-center justify-between p-8">
      <Logo />
      <div className="w-1/2 flex justify-end">
        <div className="flex justify-between">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/toll-calculator">Toll Calculator</CustomLink>
          {userProfile ? (
            <CustomLink to="/profile">
              <img
                className="rounded-full shadow-sm h-8 w-8"
                src={userProfile.data.picture.data.url}
                alt="profile"
              />
            </CustomLink>
          ) : (
            <CustomLink to="/profile">
              <UserCircleIcon className="h-8 w-8" />
            </CustomLink>
          )}
        </div>
      </div>
    </header>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  const classNames = "ml-10 font-medium";
  const activeClass = " text-yellow-500 font-semibold";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames + (isActive ? activeClass : " text-gray-500 font-medium")
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default Header;
