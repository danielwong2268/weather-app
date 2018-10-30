import { css } from "emotion";

const scaleStyle = css`
  @keyframes scale {
      0%, 100% {
          transform: scale(1.0);
      }
      50% {
          transform: scale(1.2);
      }
  }

  .scale {
    animation: scale 2s infinite;
  }
`;

export default scaleStyle;