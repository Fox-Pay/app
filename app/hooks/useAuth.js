import { useContext } from "react";

import storage from "../api/storage";
import AuthContext from "../context/context";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => {
    setUser(user);
    storage.set("user", user);
  };

  const logOut = () => {
    setUser(null);
    storage.remove("user");
  };

  return { user, logIn, logOut };
};
