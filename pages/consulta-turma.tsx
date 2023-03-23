
import CadastroTurma from "@/components/CadastroTurma";
import { useModalContext } from "@/contexts/ModalContext";
import React, { useEffect, useState } from "react";
import api from "./api/api";



export default function ConsultaTurma() {
    const { mostraCadastroTurma, activeModal } = useModalContext()

    const [turmas, setTurmas] = useState<[any]>();
    const [profs, setProf] = useState<[any]>();

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
                {activeModal && <CadastroTurma />}
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
                                <tr>
                                    <td>{turma.ano}</td>
                                    <td>João da Silva</td>
                                    <td>
                                        <button className="acessar-turma">Acessar turma</button>
                                        <button className="editar-turma">Editar</button>
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
                        <li>{professor?.nome}

                        </li>

                    ))}

                </section>
            </div >

        </>


    );
}