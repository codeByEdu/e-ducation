
import { House, List, Person, SignOut } from "phosphor-react";
import { useState } from "react";
import React from "react";
import Link from "next/link";

export default function SideMenu() {
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
        <div>
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
          <Link href={"/home"}>
            <li>
              <span><House size={32} /></span> <p>Home</p>
            </li></Link>
        </ul>
        <ul>
          <Link href={"/professores"}>
            <li>
              <span><Person size={32} /></span> <p>Cadastro Aluno</p>
            </li></Link>
        </ul>
        <ul>
          <Link href={"/disciplinas"}>
            <li>
              <span><Person size={32} /></span> <p>Cadastro Disciplinas</p>
            </li></Link>
        </ul>
        <ul>
          <Link href={"/consulta"}>
            <li>
              <span><Person size={32} /></span> <p>Consulta professor</p>
            </li></Link>
        </ul>
      </div>

      <div className="btn-signout">
        <SignOut size={24} />
      </div>
    </nav>
  );
};