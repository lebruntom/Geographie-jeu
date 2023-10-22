import React from "react";
import Card from "../components/Card";
import DepartementsImg from "../assets/img/departements.png";
import RegionsImg from "../assets/img/regions.png";

const Home = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 105px)" }}
      className="flex flex-col justify-around items-center m-4 h-full"
    >
      <div className="text-3xl m-4">
        Testez vos connaissances en géographie française
      </div>
      <div className="flex justify-around flex-wrap w-full">
        <Card
          title={"Trouver la région"}
          content={
            "Le but du jeu est de sélectionner une région française sur une carte à partir d'une région donnée."
          }
          img={RegionsImg}
          action={"/regions"}
          btn={"Jouer dès maintenant"}
        />
        <Card
          title={"Trouver le département"}
          content={
            "Le but du jeu est de sélectionner un departement français sur une carte à partir d'un département donné."
          }
          img={DepartementsImg}
          action={"/departements"}
          btn={"Jouer dès maintenant"}
        />
      </div>
    </div>
    // <div class="grid grid-rows-4 grid-flow-col gap-4">
    //   <Card
    //     title={"Trouver la région"}
    //     content={"eeeee"}
    //     img={RegionsImg}
    //     action={"/regions"}
    //     btn={"Jouer dès maintenant"}
    //   />
    //   <Card
    //     title={"Trouver le département"}
    //     content={"eeeee"}
    //     img={DepartementsImg}
    //     action={"/departements"}
    //     btn={"Jouer dès maintenant"}
    //   />
    // </div>
  );
};

export default Home;
