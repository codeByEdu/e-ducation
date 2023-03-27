
import CadastroTurma from "@/components/CadastroTurma";
import { useModalContext } from "@/contexts/ModalContext";
import React, { useEffect, useState } from "react";
import api from "./api/api";



export default function ConsultaTurma() {
    const { mostraCadastroTurma, activeModal } = useModalContext()

    function editarTurma(classe: any) {

        setTurma(classe);
        mostraCadastroTurma
    }

    const [turma, setTurma] = useState<[any]>();
    const [turmas, setTurmas] = useState<[any]>();
    const [profs, setProf] = useState<[any]>();
    interface turma {
        ano: string,
        codigo: number


    }
    useEffect(() => {
        api
            .get("/professor/all")
            .then((response) => setProf(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);
    useEffect(() => {
        api
            .get("/escola/turmas")
            .then((response) => setTurmas(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    return (
        <>


            <div className="container">
                {activeModal && <CadastroTurma professor={profs} turma={turma} />}
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

                            {turmas?.map(turma => (
                                <tr key={turma.codigo}>
                                    <td>{turma.ano}</td>
                                    <td>{turma.professorResponsavel.nome}</td>
                                    <td>
                                        <button className="acessar-turma">Acessar turma</button>
                                        <button onClick={mostraCadastroTurma} className="editar-turma">Editar</button>
                                    </td>
                                </tr>


                            ))}


                        </tbody>
                    </table>
                    <button onClick={mostraCadastroTurma} id="cadastro-turma">Cadastrar Nova Turma</button>
                </section>

                <section>
                    <h2>Professores</h2>

                    {profs?.map(professor => (
                        <li key={professor.id}>

                            {professor?.nome}

                        </li>

                    ))}

                </section>
            </div >

        </>


    );
}