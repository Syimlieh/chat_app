import React from "react";

const TypingIndicator = () => {
  return (
    <>
      <div className="typingIndicatorBubble">
        <div className="typingIndicatorBubbleDot"></div>
        <div className="typingIndicatorBubbleDot"></div>
        <div className="typingIndicatorBubbleDot"></div>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        .typingIndicatorBubble {
          display: flex;
          margin-top: .4rem;
        }

        .typingIndicatorBubbleDot {
          width: 4px;
          height: 4px;
          margin-right: 4px;
          background-color: #57585a;
          border-radius: 50%;
          animation-name: bounce;
          animation-duration: 1.3s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .typingIndicatorBubbleDot:first-of-type {
          margin: 0px 4px;
        }

        .typingIndicatorBubbleDot:nth-of-type(2) {
          animation-delay: 0.15s;
        }

        .typingIndicatorBubbleDot:nth-of-type(3) {
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </>
  );
};

export default TypingIndicator;
