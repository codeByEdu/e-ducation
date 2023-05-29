import CadastroAluno from "@/components/CadastroAluno";
import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Turma() {
  const router = useRouter();
  const { id } = router.query;
  const [alunos, setAlunos] = useState<any[]>([]);
  const { apiGet } = useApi();
  const { mostraCadastroAluno, activeModal } = useModalContext();
  const [modalEditaAlunoAberto, setModalEditaAlunoAberto] =
    useState<boolean>(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<any>();

  useEffect(() => {
    if (id) {
      listarAlunos();
    }
  }, [id]);

  async function listarAlunos() {
    const { data } = await apiGet("/aluno/class/all?=" + "&idTurma=" + id);
    setAlunos(data);
  }

  function mostraEdicaoAlunoModal(aluno: any) {
    setAlunoSelecionado(aluno);
    mostraCadastroAluno();
  }

  function mostraCadastroAlunoModal() {
    setAlunoSelecionado(null);
    mostraCadastroAluno();
  }


  let data = {
    alunoSelecionado: alunoSelecionado ? alunoSelecionado : null,
    idTurma: id ? parseInt(id.toString()) : 0,
    listarAlunos: listarAlunos
  }

  return (
    <div className="container">
      {activeModal && <CadastroAluno data={data} />}

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
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => mostraEdicaoAlunoModal(aluno)}
                >
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
        onClick={() => mostraCadastroAlunoModal()}
        type="button" className="btn btn-success">
        Adicionar aluno a turma
      </button>
    </div>
  );
}



export default Turma;
