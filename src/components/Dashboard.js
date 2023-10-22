import React from "react";

const Dashboard = ({ toFind }) => {
  return (
    <div className="absolute top-15 right-0 transform  z-[1000] bg-gray-100 p-5 m-5 shadow-md rounded-sm">
      <p>Où se situe : {toFind.nom}</p>
    </div>
  );
};

export default Dashboard;
