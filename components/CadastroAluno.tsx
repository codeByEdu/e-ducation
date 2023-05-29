import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import { useEffect, useState } from "react";

type CadastroalunoProps = {
    data: {
        alunoSelecionado: any;
        idTurma: number;
        listarAlunos: any;
    };
};


export default function Cadastroaluno({ data }: CadastroalunoProps) {
    const { apiPost } = useApi();
    const [aluno, setAluno] = useState<aluno>();
    const { mostraCadastroAluno } = useModalContext();
    const [nome, setNome] = useState<string>(data.alunoSelecionado?.nome || "");
    const [emailResponsavel, setEmailResponsavel] = useState<string>(data.alunoSelecionado?.emailResponsavel || "");

    useEffect(() => {

        if (data?.alunoSelecionado && data.alunoSelecionado.id) {
            setEmailResponsavel(data.alunoSelecionado?.email);
            setNome(data.alunoSelecionado?.nome);
        }
        else {
            setEmailResponsavel("");
            setNome("");
        }
    }, []);

    interface aluno {
        id?: number | undefined;
        nome: string;
        emailResponsavel: string;
        cdTurma: number;
    }

    useEffect(() => {
        setAluno({
            id: data?.alunoSelecionado && data.alunoSelecionado?.id,
            nome: nome ? nome : data.alunoSelecionado?.nome,
            emailResponsavel: emailResponsavel ? emailResponsavel : data.alunoSelecionado?.emailResponsavel,
            cdTurma: data.idTurma

        });
    }, [nome, emailResponsavel]);

    let handleSubmit = (event: any) => {
        try {
            event.preventDefault();
            console.log(aluno);
            if (data?.alunoSelecionado && data.alunoSelecionado.id) {
                atualizaAluno();
            } else {
                addAluno();
            }
        } catch (err) {
            console.log(err);
        }
    };
    const { apiPut } = useApi();

    async function atualizaAluno() {
        await apiPut("/aluno/" + aluno?.id, {
            nome,
            emailResponsavel: aluno?.emailResponsavel,
            cdTurma: aluno?.cdTurma,
        });
    }
    async function addAluno() {
        await apiPost("/aluno/", {
            nome,
            emailResponsavel: aluno?.emailResponsavel,
            cdTurma: aluno?.cdTurma,
        });
    }

    return (
        <>
            <div className="container">
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "100%",
                        position: "fixed",
                        top: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <label> Nome</ label>
                    <input

                        className="form-control"
                        onChange={(e) => setNome(e.target.value)} value={nome} />
                    <label>Email do Responsável</label>
                    <input
                        className="form-control"
                        onChange={(e) => setEmailResponsavel(e.target.value)}
                        value={emailResponsavel}
                    />

                    <button
                        className="btn btn-success"
                        onClick={async () => {
                            await handleSubmit;
                            await data.listarAlunos();
                            mostraCadastroAluno();
                        }} >
                        Editar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={mostraCadastroAluno}>Fechar</button>

                </form>
            </div>
        </>
    );
}
