import React from "react";
import { useAppContext } from "../context/appContext";
import { StatItem } from ".";
import { FaCheckCircle, FaRedo, FaHeart } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "learned words",
      count: stats.learned || 0,
      icon: <FaCheckCircle />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "need review words",
      count: stats.review || 0,
      icon: <FaRedo />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "favorite words",
      count: stats.favorite || 0,
      icon: <FaHeart />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
