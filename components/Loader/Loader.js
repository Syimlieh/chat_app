import React from "react";
import JSXStyle from "styled-jsx/style";

const Loader = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        .lds-ellipsis {
          display: flex;
          align-items: center;
          justify-content: start;
          position: relative;
          width: 5rem;
          height: 100%;
        }
        .lds-ellipsis div {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .lds-ellipsis div:nth-child(1) {
          left: 2px;
          animation: lds-ellipsis1 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(2) {
          left: 2px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(3) {
          left: 26px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(4) {
          left: 50px;
          animation: lds-ellipsis3 0.6s infinite;
        }
        @keyframes lds-ellipsis1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes lds-ellipsis3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes lds-ellipsis2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
