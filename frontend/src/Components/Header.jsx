import { MdStickyNote2 } from "react-icons/md";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <MdStickyNote2 className="header-icon" />
        <h1>Notes</h1>
      </div>
      <p className="subtitle">Organize your ideas beautifully</p>
    </header>
  );
}

export default Header;