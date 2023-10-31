import React, {useContext} from "react";
import DefaultUserIcon from "../Icons/DefaultUserIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../helpers/AuthContext";

const ProfileMenu = ({ toggleState}) => {
  const navigate = useNavigate();
  const {setAuthState} = useContext(AuthContext);

  const onSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken")
    setAuthState({username: "", id: 0, status: false});
    navigate("/auth");
  };

  return (
    <div>
      <DefaultUserIcon />
      {toggleState && (
        <ul
          role="menu"
          data-popover="profile-menu"
          data-popover-placement="bottom"
          className="absolute z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          <button
            tabIndex="-1"
            role="menuitem"
            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            onClick={onSignOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
              ></path>
            </svg>
            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
              Sign Out
            </p>
          </button>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
