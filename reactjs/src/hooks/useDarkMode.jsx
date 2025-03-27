import { useEffect, useState } from "react"
import useStorage from "./useStorage"

export default function useDarkMode() {
  const [theme, setTheme] = useState();
  const {getLocal,setLocal} = useStorage();

  useEffect(() => {
    let storedTheme = ""
    if(getLocal("theme")){
        storedTheme = getLocal("theme")==="dark" ? "dark" : "light";
    }else{
        storedTheme = window.matchMedia("prefers-color-scheme: dark") ? "dark" : "light";
    }
    setLocal("theme",storedTheme)
    setTheme(storedTheme);
    storedTheme==="dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
  }, []);


  const changeTheme = () => {
    const hydratedTheme = getLocal("theme");
    const computedTheme = hydratedTheme === "dark" ? "light" : "dark";

    setLocal("theme",computedTheme)
    setTheme(computedTheme);
    computedTheme==="dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
  };

  return {theme,changeTheme};
}