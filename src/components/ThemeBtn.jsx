import React from "react";
import useTheme from "../theme/theme";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const ThemeBtn = ({ className }) => {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const toggleTheme = () => {
    if (themeMode === "light") {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <>
      <button className={className} onClick={toggleTheme}>
        {themeMode === "light" ? (
          <IoMdMoon color="White" size={28} />
        ) : (
          <IoMdSunny color="White" size={28} />
        )}
      </button>
    </>
  );
};

export default ThemeBtn;
