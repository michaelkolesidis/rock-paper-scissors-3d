import Logo from "./assets/rps3d.svg";

export default function Interface() {
  return (
    <>
      <img className="logo" src={Logo} alt="Rock Paper Scissors 3D Logo" />
      <div className="author">By Michael Kolesidis</div>
    </>
  );
}
