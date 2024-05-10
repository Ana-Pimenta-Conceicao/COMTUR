import React from "react";
import Dash from "../../assets/dash";
import PropTypes from "prop-types";

const CardDashboard = ({ titulo, contagem, icone }) => {
  return (
    <div className="w-[300px] h-[216px] '">
      <div className=" w-[304px] h-[216px] top-0 left-0">
        <div className="relative w-[300px] h-[216px] bg-[#FFFFFF] rounded-[12px] border border-solid border-[#e7e6e6] shadow-[0px_1px_50px_#00000014]">
          <div className="absolute w-[187px] top-[24px] left-[72px]  font-semibold text-black text-[19px] tracking-[0] leading-[normal]">
            {titulo}
          </div>
          <div className="absolute w-[300px] h-[76px] top-[127px] -left-px">
            <Dash />
          </div>
          <div className="absolute w-[186px] h-[73px] top-[60px] left-[104px] font-bold text-[#ffd121] text-[40px] text-center tracking-[0] leading-[normal]">
            {contagem}
          </div>
          <div className="absolute  w-[34px] h-[29px] top-[23px] left-[26px] bg-black rounded-[5px]">
            <div className="flex w-full h-full items-center justify-center">
              {icone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardDashboard.propTypes = {
  titulo: PropTypes.string.isRequired,
  contagem: PropTypes.arrayOf(PropTypes.string).isRequired,
  icone: PropTypes.node,
};

export default CardDashboard;
