import CadastroProfessor from "@/components/CadastroProfessor";
import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import React, { useEffect, useState } from "react";


export default function ConsultaProfessor() {
  const { apiGet, apiDelete, apiPost, apiPatch } = useApi();
  const { mostraCadastroProfessor, activeModal } = useModalContext();
  const [profs, setProf] = useState<[any]>();
  const [idProf, setIdProf] = useState(0);
  const [professor, setProfessor] = useState<any>();

  useEffect(() => {
    listarProfessores();
  }, []);

  const deleteProf = () => {
    apiDelete("/professor/" + idProf);
    listarProfessores();
  }

  async function listarProfessores() {
    const { data } = await apiGet("/professor/all");
    setProf(data);
  }

  async function addProf(prof: any) {
    await apiPost("/professor/add", prof);
    mostraCadastroProfessor();
    listarProfessores();
  }

  async function updateProf(prof: any) {
    await apiPatch("/professor/patch", prof);
    mostraCadastroProfessor();
    listarProfessores();
  }

  const data = {
    addProf,
    updateProf,
    professor,
    listarProfessores
  }

  return (
    <div className="container">
      {activeModal && <CadastroProfessor data={data} />}
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
              <td>{professor.tipoProfessor.descricao}</td>
              <td>
                <button type="button" className="btn btn-secondary btn-sm"
                  onClick={() => { setProfessor(professor); mostraCadastroProfessor() }}
                >
                  Editar
                </button>
                <button type="button" className="btn btn-danger btn-sm"
                  onClick={() => { setIdProf(professor.id); deleteProf() }}

                >

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
    </div >
  );
}


