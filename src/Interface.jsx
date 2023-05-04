// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import Logo from "./assets/rps3d.svg";
import MLogo from "./assets/mm_white.svg";
import useGame from "./stores/useGame.js";

export default function Interface() {
  // let sound = false;
  const round = useGame((state) => state.round);
  const playerScore = useGame((state) => state.playerScore);
  const computerScore = useGame((state) => state.computerScore);

  return (
    <>
      <img className="logo" src={Logo} alt="Rock Paper Scissors 3D Logo" />
      <div className="control-buttons">
        <div className="control-button" id="menu">
          <img src="./icons/menu.svg" alt="menu" />
        </div>
      </div>
      <a href="https://michaelkolesidis.com" target="_blank">
        <img className="author" src={MLogo} alt="author's logo"></img>
      </a>
      <div className="score">
        <div className="individual-score">Round {round}</div>
        <div className="individual-score">You: {playerScore}</div>
        <div className="individual-score">Computer: {computerScore}</div>
      </div>
    </>
  );
}
