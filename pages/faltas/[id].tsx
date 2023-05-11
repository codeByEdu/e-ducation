import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Turma from "../turmas/[id]";


function Falta() {
    const router = useRouter();
    const { id } = router.query;
    const [alunos, setAlunos] = useState<[any]>();
    const [horario, setHorario] = useState<Horario>();
    const [falta, setFalta] = useState<Falta>();
    const { apiGet, apiDelete, apiPost, apiPatch } = useApi();

    interface Horario {
        idHorario: number,
        idTurma: number,
        idDisciplina: number,
        diaSemana: number,
        ordemAula: number,
        nomeDisciplina: string
    }

    interface Student {
        id: number,
        nome: string,
        emailResponsavel: string
    }
    interface Falta {
        alunos: Student[];
        codHorario: number;
    }
    function salvarFaltas() {
        const falta: Falta = {
            alunos: selectedStudents,
            codHorario: horario?.idHorario || 0
        }
        setFalta(falta);
        console.log(falta);
        enviarFalta();
    }


    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

    const handleStudentSelection = (student: Student) => {
        const alreadySelected = selectedStudents.find((s) => s.id === student.id);

        if (alreadySelected) {
            const newSelection = selectedStudents.filter((s) => s.id !== student.id);
            setSelectedStudents(newSelection);
        } else {
            setSelectedStudents([...selectedStudents, student]);
        }
    };

    useEffect(() => {
        listarAlunos();
        var diaSemana = getDiaSemana();
        var ordem = getOrdem();
        retornaHorario(diaSemana, ordem);
    }, []);

    async function listarAlunos() {
        const { data } = await apiGet("/aluno/class/all?=" + "&idTurma=" + id);
        setAlunos(data);
    }
    async function retornaHorario(diaSemana: number, ordem: number) {
        const { data } = await apiGet("/turma/" + id + "/horario/" + diaSemana + "/" + ordem);
        setHorario(data);
        //   console.log(data);
    }
    async function enviarFalta() {
        try {
            const response = await apiPost("/escola/falta", falta);
        } catch (error: any) {
            if (error.response) {
                const { status, data } = error.response;
                if (status == 403) {
                    alert(data);
                }
            }
        }
    }

    function getDiaSemana() {
        var data = new Date();
        var diaSemana = data.getDay();
        return diaSemana;
    }
    function getOrdem() {
        var dataAtual = new Date();
        var primeiraAula = new Date();
        var ordem = 0;
        primeiraAula.setHours(21, 0);
        if (dataAtual < primeiraAula) {
            ordem = 1
        }
        else {
            ordem = 2
        }
        return ordem;
    }
    return (

        <div className="container mt-5">
            <h2 className="mb-3">Lista de chamada</h2>
            <p>Selecione os alunos que receberão falta</p>
            <div className="row justify-content-center">
                <h3>Aula de {horario?.nomeDisciplina}</h3>
                <div className="col-md-6">
                    <h4>Alunos ({alunos?.length})</h4>
                    <ul className="list-group">
                        {alunos?.map((student) => (
                            <li
                                className={`list-group-item ${selectedStudents.includes(student) ? 'active' : ''
                                    }`}
                                key={student.id}
                                onClick={() => handleStudentSelection(student)}
                            >
                                {student.nome}
                            </li>
                        ))}
                    </ul>


                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <button
                        className="btn btn-warning mt-3 d-block mx-auto"
                        onClick={() => {
                            salvarFaltas();
                        }}
                    >
                        Enviar falta
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Falta;
