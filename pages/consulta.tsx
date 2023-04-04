import CadastroProfessor from "@/components/CadastroProfessor";
import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import { useEffect, useState } from "react";
import api from "./api/api";

export default function ConsultaProfessor() {
  const { apiGet } = useApi();
  const { mostraCadastroProfessor, activeModal } = useModalContext();
  const [profs, setProf] = useState<[any]>();

  useEffect(() => {
    api
      .get("/professor/all")
      .then((response) => setProf(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  function professores() {}

  return (
    <div className="container">
      {activeModal && <CadastroProfessor />}
      <table style={{ width: "100%" }} className="table-primary table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th style={{ textAlign: "left" }} scope="col">
              Nome
            </th>

            <th style={{ textAlign: "left" }} scope="col">
              Email
            </th>

            <th style={{ textAlign: "left" }} scope="col">
              Tipo
            </th>
            <th style={{ textAlign: "left" }} scope="col" />
          </tr>
        </thead>
        <tbody>
          {profs?.map((professor) => (
            <tr key={professor.id}>
              <th scope="row">{professor.id}</th>

              <td>{professor.nome}</td>
              <td>{professor.email}</td>
              <td>{professor.tipoProfessor}</td>
              <td>
                <button type="button" className="btn btn-secondary btn-sm">
                  Editar
                </button>
                <button type="button" className="btn btn-danger btn-sm">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={mostraCadastroProfessor}
        className="btn btn-success"
      >
        Adicionar professor
      </button>
    </div>
  );
}
