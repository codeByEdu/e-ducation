import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Turma from "../turmas/[id]";
import SelectHorario from "@/components/SelectHorario";
import { useModalContext } from "@/contexts/ModalContext";

function Falta() {
    const router = useRouter();
    const { id } = router.query;
    const [alunos, setAlunos] = useState<[any]>();
    const [horario, setHorario] = useState<Horario>();
    const [falta, setFalta] = useState<Falta>();
    const { apiGet, apiDelete, apiPost, apiPatch } = useApi();
    const { mostraSelectHorario, activeModal } = useModalContext();
    const [diaSemana, setDiaSemana] = useState<number>(0);
    const [ordem, setOrdem] = useState<number>(0);

    interface Horario {
        idHorario: number,
        idTurma: number,
        idDisciplina: number,
        diaSemana: number,
        ordemAula: number,
        nomeDisciplina: string
    }
    const data = {
        salvarFaltas
    }

    interface Student {
        id: number,
        nome: string,
        emailResponsavel: string
    }
    interface Falta {
        alunos: Student[];
        codHorario: number;
        dataFalta?: Date;
    }
    async function salvarFaltas(form: any) {
        setDiaSemana(getDiaSemana(form?.dia));
        var dia = new Date(form.dia).getDay();
        retornaHorario(dia, parseInt(form.ordem));
        const falta: Falta = {
            alunos: selectedStudents,
            codHorario: horario?.idHorario || 0
        }
        setFalta(falta);
        console.log(falta);

        alert("Deseja enviar " + selectedStudents.length + " faltas" + " para a aula de " + horario?.nomeDisciplina + " do dia " + form?.dia + " na " + form?.ordem + "ª aula?");

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

            alert("Faltas enviadas com sucesso!");
            router.push("/turmas/" + id);
        } catch (error: any) {
            if (error.response) {
                const { status, data } = error.response;
                if (status == 403) {
                    alert(data);
                }
            }
        }
    }

    function getDiaSemana(dia: any) {
        var data = new Date(dia);
        var diaSemana = data.getDay();
        return diaSemana;
    }
    function getOrdem(hora: any) {
        var dataAtual = new Date();
        dataAtual.setHours(hora.split(":")[0], hora.split(":")[1]);
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
        <div className="container">
            {activeModal && <SelectHorario data={data} />}
            <section>

                <div className="container mt-5">
                    <h2 className="mb-3">Lista de chamada</h2>
                    <p>Selecione os alunos que receberão falta</p>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h4>Alunos ({alunos?.length})</h4>
                            <ul className="list-group ">
                                {alunos?.map((student) => (
                                    <li
                                        className={`list-group-item ${selectedStudents.includes(student) ? 'active' : ''}`}
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
                                    mostraSelectHorario();
                                }}
                            >
                                Enviar falta
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Falta;
