import CadastroTurma from "@/components/CadastroTurma";
import ListaAlunos from "../pages/alunos";
import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import { useEffect, useState } from "react";

export default function ConsultaTurma() {
  const { apiGet } = useApi();
  const { mostraCadastroTurma, activeModal } = useModalContext();

  function editarTurma(classe: any) {
    setTurma(classe);
    mostraCadastroTurma;
  }
  const [turma, setTurma] = useState<[any]>();
  const [turmas, setTurmas] = useState<[any]>();
  const [profs, setProf] = useState<[any]>();
  interface turma {
    ano: string;
    codigo: number;
  }

  useEffect(() => {
    listaProfessores();
    listaTurmas();
  }, []);

  async function listaProfessores() {
    const { data } = await apiGet("/professor/all");
    setProf(data);
  }

  async function listaTurmas() {
    const { data } = await apiGet("/escola/turmas");
    setTurmas(data);
  }

  return (
    <>
      <div className="container">
        {activeModal && <CadastroTurma professor={profs} turma={turma} />}
        /<section>
          <h2>Turmas</h2>
          <table>
            <thead>
              <tr>
                <th>Nome da Turma</th>
                <th>Professor Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas?.map((turma) => (
                <tr key={turma.codigo}>
                  <td>{turma.ano}</td>
                  <td>{turma.professorResponsavel.nome}</td>
                  <td>
                    <button className="acessar-turma">Acessar turma</button>
                    <button
                      onClick={mostraListaAlunos}
                      className="editar-turma"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={mostraCadastroTurma} id="cadastro-turma">
            Cadastrar Nova Turma
          </button>
        </section>

        <section>
          <h2>Professores</h2>

          {profs?.map((professor) => (
            <li key={professor.id}>{professor?.nome}</li>
          ))}
        </section>
      </div>
    </>
  );
}
