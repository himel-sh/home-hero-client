import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import MyServices from "../components/MyServices";

const MyServicesWrapper = () => {
  const { user } = useContext(AuthContext);
  return <MyServices providerEmail={user?.email} />;
};

export default MyServicesWrapper;
