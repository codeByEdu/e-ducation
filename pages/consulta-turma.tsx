import CadastroTurma from "@/components/CadastroTurma";
import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConsultaTurma() {
  const { apiGet, apiPatch, apiPost } = useApi();
  const { mostraCadastroTurma, activeModal } = useModalContext();


  const [turma, setTurma] = useState<[any]>();
  const [turmas, setTurmas] = useState<[any]>();
  const [profs, setProf] = useState<[any]>();
  interface turma {
    ano: string;
    codigo: number;
  }
  const data = {
    addTurma,
    updateTurma,
    turma,
    listaTurmas,
    profs
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
    const { data } = await apiGet("/turma/all");
    setTurmas(data);
  }
  async function addTurma(turma: any) {
    await apiPost("/turma/add", turma);
    mostraCadastroTurma();
    listaTurmas();
  }

  async function updateTurma(turma: any) {
    await apiPatch("/turma/patch", turma);
    mostraCadastroTurma();
    listaTurmas();
  }


  return (
    <>
      <div className="container">
        {activeModal && <CadastroTurma data={data} />}
        <section>
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
                  <td style={{
                    //flex direction row gap 10 px
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",

                  }}>
                    <Link href={"/turmas/" + turma.codigo}>
                      <button className="btn btn-success">Acessar turma
                      </button>
                    </Link>
                    <button className="btn btn-primary">Editar</button>
                    <Link href={"/faltas/" + turma.codigo}>
                      <button className="btn btn-warning">Acessar faltas</button>
                    </Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={mostraCadastroTurma} className="btn btn-success">
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

