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
          <img src="./icons/menu.svg" />
        </div>
      </div>
      <a href="https://michaelkolesidis.com" target="_blank">
        <img className="author" src={MLogo}></img>
      </a>
      <div className="score">
        <div className="individual-score">Round {round}</div>
        <div className="individual-score">You: {playerScore}</div>
        <div className="individual-score">Computer: {computerScore}</div>
      </div>
    </>
  );
}
