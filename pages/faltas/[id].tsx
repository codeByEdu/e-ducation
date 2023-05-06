import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Turma from "../turmas/[id]";


function Falta() {
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
    async function listarAlunos() {
        const { data } = await apiGet("/aluno/class/all?=" + "&idTurma=" + id);
        setAlunos(data);
    }
    return (


        <div className="container">
            <h2>Lista de Alunos</h2>
            <div className="list-group">

                <form className="list-group-item">
                    <h4>Selecione os alunos que terão faltas</h4>
                    {alunos?.map((aluno: any) => (
                        <label className="list-group-item">
                            <input className="form-check-input me-2" type="checkbox" value={aluno.codigo} />
                            {aluno.nome}
                        </label>
                    ))}
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            </div>
        </div>

    )
}
export default Falta;
