
import React from "react";
import { Outlet } from "react-router-dom";
import { WelcomeModal } from "../player/WelcomeModal";

const PlayerLayout = () => {
  return (
    <>
      <WelcomeModal />
      <Outlet />
    </>
  );
};

export default PlayerLayout;
