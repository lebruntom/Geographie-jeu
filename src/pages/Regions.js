import React, { useEffect, useState, useMemo } from "react";
import FranceMap from "../components/FranceMap";
import Dashboard from "../components/Dashboard";
import { regionsData } from "../utils/data/regions";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import useTimer from "../hooks/useTimer";
import { calculateSuccessPercentage } from "../utils/game";
import ProgressBar from "../components/ProgressBar";

const Regions = () => {
  const allRegions = useMemo(
    () => [...regionsData.features.map((region) => region.properties)],
    []
  );

  const navigate = useNavigate();
  const [clickedItems, setClickedItems] = useState([]);
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
      "Le but du jeu est de sélectionner une région française sur une carte à partir d'une région donnée.",
    title: "Trouve la région",
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
      allRegions.length
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

  const [regionToFind, setRegionToFind] = useState({ nom: "", code: "" });
  useEffect(() => {
    if (!showModal) {
      const regionsNotClicked = allRegions.filter(
        (region) =>
          !clickedItems.find((clicked) => clicked.code === region.code)
      );

      let newRegionToFind = "";

      if (regionsNotClicked.length === 1) {
        newRegionToFind = regionsNotClicked[0];
      } else if (regionsNotClicked.length > 1) {
        newRegionToFind =
          regionsNotClicked[
            Math.floor(Math.random() * regionsNotClicked.length)
          ];
      } else {
        endGame();
      }

      setRegionToFind(newRegionToFind);
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
          <ProgressBar pct={(clickedItems.length * allRegions.length) / 100} />
          <Dashboard toFind={regionToFind} />
          <FranceMap
            data={regionsData.features}
            toFind={regionToFind}
            clickedItems={clickedItems}
            setClickedItems={setClickedItems}
          />
        </>
      )}
    </div>
  );
};

export default Regions;
