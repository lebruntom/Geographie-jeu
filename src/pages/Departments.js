import React, { useEffect, useState } from "react";
import FranceMap from "../components/FranceMap";
import Dashboard from "../components/Dashboard";
import { departementsData } from "../utils/data/departements";
import Modal from "../components/Modal";
import useTimer from "../hooks/useTimer";
import { calculateSuccessPercentage } from "../utils/game";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const Departments = () => {
  const allDepartments = [
    ...departementsData.features.map((department) => department.properties),
  ];

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const { time, startTimer, stopTimer, resetTimer } = useTimer();

  const restartGame = () => {
    resetTimer();
    setClickedItems([]);
    setShowModal(false);
    startTimer();
  };

  const goToHome = () => {
    navigate("/");
  };

  const startModal = {
    content:
      "Le but du jeu est de sélectionner un departement français sur une carte à partir d'un département donné.",
    title: "Trouve le département",
    confirm: "Jouer !",
    cancel: "Quitter",
    cancelAction: goToHome,
    confirmAction: restartGame,
  };

  const endGame = () => {
    stopTimer();
    const goodAwnsers = clickedItems.filter(
      (item) => item.color === "#2ECC71"
    ).length;

    const successPct = calculateSuccessPercentage(
      goodAwnsers,
      allDepartments.length
    );

    const endModal = {
      content: `${successPct.toFixed(2)}% de bonnes réponses en ${time}`,
      title: "Fin du jeu",
      confirm: "Rejouer !",
      cancel: "Quitter",
      cancelAction: goToHome,
      confirmAction: restartGame,
    };

    setModal(endModal);
    setShowModal(true);
  };

  const [modal, setModal] = useState(startModal);
  const [clickedItems, setClickedItems] = useState([]);
  const [departmentToFind, setDepartmentToFind] = useState({
    nom: "",
    code: "",
  });

  useEffect(() => {
    if (!showModal) {
      const departmentsNotClicked = allDepartments.filter(
        (department) =>
          !clickedItems.find((clicked) => clicked.code === department.code)
      );

      let newDepartmentToFind = "";

      if (departmentsNotClicked.length === 1) {
        newDepartmentToFind = departmentsNotClicked[0];
      } else if (departmentsNotClicked.length > 1) {
        newDepartmentToFind =
          departmentsNotClicked[
            Math.floor(Math.random() * departmentsNotClicked.length)
          ];
      } else {
        endGame();
      }

      setDepartmentToFind(newDepartmentToFind);
    }
  }, [clickedItems, showModal]);

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 84px)" }}>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          content={modal.content}
          title={modal.title}
          confirm={modal.confirm}
          cancel={modal.cancel}
          cancelAction={modal.cancelAction}
          confirmAction={modal.confirmAction}
        />
      ) : (
        <>
          <ProgressBar
            pct={(clickedItems.length * allDepartments.length) / 100}
          />
          <Dashboard toFind={departmentToFind} />
          <FranceMap
            data={departementsData.features}
            toFind={departmentToFind}
            clickedItems={clickedItems}
            setClickedItems={setClickedItems}
          />
        </>
      )}
    </div>
  );
};

export default Departments;
