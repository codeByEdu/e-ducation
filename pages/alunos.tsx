import CadastroProfessor from "@/components/CadastroProfessor";
import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import React, { useEffect, useState } from "react";


export default function ListaAlunos(idTurma: number) {
  const { apiGet, apiDelete, apiPost, apiPatch } = useApi();
  const { mostraCadastroProfessor, activeModal } = useModalContext();
  const [alunos, setAlunos] = useState<[any]>();
  const [idProf, setIdProf] = useState(0);
  const [professor, setProfessor] = useState<any>();

  useEffect(() => {
    listarAlunos();
  }, []);

  const deleteProf = () => {
    apiDelete("/aluno/" + idProf);
    listarAlunos();
  }

  async function listarAlunos() {
    const { data } = await apiGet("/aluno/class/all?=" + "&idTurma=" + idTurma);
    setAlunos(data);
  }

  const data = {
    professor,
    listarAlunos
  }

  return (
    <div className="container">
      {/* {activeModal && <CadastroProfessor data={data} />} */}
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
            <th style={{ textAlign: "left" }} scope="col" />
          </tr>
        </thead>
        <tbody>
          {alunos?.map((aluno) => (
            <tr key={aluno.id}>
              <th scope="row">{aluno.id}</th>
              <td>{aluno.nome}</td>
              <td>{aluno.emailResponsavel}</td>

              <td>
                <button type="button" className="btn btn-secondary btn-sm"
                //onClick={() => { setaluno(aluno); mostraCadastroAluno() }}
                >
                  Editar
                </button>
                <button type="button" className="btn btn-danger btn-sm"
                // onClick={() => { setIdProf(aluno.id); deleteProf() }}

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


