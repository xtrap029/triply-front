import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    const userProfile = getItem("userProfile");
    if (userProfile) {
      addUser(JSON.parse(userProfile));
    }
  }, []);

  const addUser = (userProfile) => {
    setUserProfile(userProfile);
    setItem("userProfile", JSON.stringify(userProfile));
  };

  const removeUser = () => {
    setUserProfile(null);
    setItem("userProfile", "");
  };

  return { userProfile, addUser, removeUser };
};
