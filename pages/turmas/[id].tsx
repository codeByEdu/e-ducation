import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Turma() {
  const router = useRouter();
  const { id } = router.query;
  const [alunos, setAlunos] = useState<[any]>();
  const { apiGet, apiDelete, apiPost, apiPatch } = useApi();

  useEffect(() => {
    console.log(id);
  }, [id]);
  useEffect(() => {
    listarAlunos();
  }, []);

  // const deleteProf = () => {
  //   apiDelete("/aluno/" + idProf);
  //   listarAlunos();
  // }

  async function listarAlunos() {
    const { data } = await apiGet("/aluno/class/all?=" + "&idTurma=" + id);
    setAlunos(data);
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

        className="btn btn-success"
      >
        Adicionar aluno a turma
      </button>

    </div >
  );
}

export default Turma;
