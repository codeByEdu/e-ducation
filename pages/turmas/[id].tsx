import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Turma() {
  const router = useRouter();
  const { id } = router.query;
  const [alunos, setAlunos] = useState<any[]>([]);
  const { apiGet } = useApi();
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

  function abreModalEditaAluno(aluno: any) {
    alteraEstadoModalEditaAluno();
    setAlunoSelecionado(aluno);
  }

  function alteraEstadoModalEditaAluno() {
    setModalEditaAlunoAberto(!modalEditaAlunoAberto);
  }

  return (
    <div className="container">
      {modalEditaAlunoAberto && (
        <ModalEditaAluno
          alunoSelecionado={alunoSelecionado}
          alteraEstadoModalEditaAluno={alteraEstadoModalEditaAluno}
          idTurma={id ? parseInt(id.toString()) : 0}
          listarAlunos={listarAlunos}
        />
      )}
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
                  onClick={() => abreModalEditaAluno(aluno)}
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
      <button type="button" className="btn btn-success">
        Adicionar aluno a turma
      </button>
    </div>
  );
}

type IModalEditaAluno = {
  alunoSelecionado: any;
  alteraEstadoModalEditaAluno: () => void;
  idTurma: number;
  listarAlunos: () => Promise<void>;
};

const ModalEditaAluno = ({
  alunoSelecionado,
  alteraEstadoModalEditaAluno,
  idTurma,
  listarAlunos,
}: IModalEditaAluno) => {
  const [nome, setNome] = useState<string>(alunoSelecionado.nome);
  const [emailResponsavel, setEmailResponsavel] = useState<string>(
    alunoSelecionado.emailResponsavel
  );

  const { apiPut } = useApi();

  async function atualizaAluno() {
    await apiPut("/aluno/" + alunoSelecionado.id, {
      nome,
      emailResponsavel,
      cdTurma: idTurma,
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "400px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button onClick={alteraEstadoModalEditaAluno}>Fechar</button>
        <input onChange={(e) => setNome(e.target.value)} value={nome} />
        <input
          onChange={(e) => setEmailResponsavel(e.target.value)}
          value={emailResponsavel}
        />
        <button
          onClick={async () => {
            atualizaAluno();
            await listarAlunos();
            alteraEstadoModalEditaAluno();
          }}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default Turma;
