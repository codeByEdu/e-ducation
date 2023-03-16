
import { List, SignOut } from "phosphor-react";
import { useState } from "react";
import  React  from "react";

export default function SideMenu () {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  function handleChangeMenuState() {
    console.log("abriu");   
    setActiveMenu(!activeMenu);
  }

  return (
    <nav className={`left-menu ${activeMenu ? "" : "closed"}`}>
      {!activeMenu && (
        <button className="btn-expand-menu" onClick={handleChangeMenuState}>
          <List size={20} />
        </button>
      )}

      <div className="user-info">
        <img src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max" />
        <div onClick={handleChangeMenuState}>
          <strong>USUARIO</strong>
          <span>CARGO</span>
        </div>
        {activeMenu && (
          <button className="btn-expand-menu" onClick={handleChangeMenuState}>
            <List size={20} />
          </button>
        )}
      </div>

      <div className="menu-items">
        <ul>
          <li>
            <span>ICONE</span> <p>NOME-PAGINA</p>
          </li>
        </ul>
      </div>

      <div className="btn-signout">
        <SignOut size={24} />
      </div>
    </nav>
  );
};