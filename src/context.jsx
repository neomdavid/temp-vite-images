import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedDarkMode = JSON.parse(localStorage.getItem("darkTheme"));

  return storedDarkMode || prefersDarkMode;
};

export function AppContextProvider({ children }) {
  const [isDarkTheme, setDarkTheme] = useState(getInitialDarkMode());
  const [searchValue, setSearchValue] = useState("lion");
  function toggleDarkTheme() {
    const newDarkTheme = !isDarkTheme;
    setDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  }

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchValue, setSearchValue }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
// export const useGlobalContext = ()=> useContext(AppContext)
