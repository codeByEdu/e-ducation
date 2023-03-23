
import CadastroTurma from "@/components/CadastroTurma";
import { useModalContext } from "@/contexts/ModalContext";
import React, { useState } from "react";



export default function ConsultaTurma() {
    const { mostraCadastroTurma, activeModal } = useModalContext()
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
                            <tr>
                                <td>1º ano A</td>
                                <td>João da Silva</td>
                                <td>
                                    <button className="acessar-turma">Acessar turma</button>
                                    <button className="editar-turma">Editar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2º ano A</td>
                                <td>Maria Oliveira</td>
                                <td>
                                    <button className="acessar-turma">Acessar turma</button>
                                    <button className="editar-turma">Editar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3º ano A</td>
                                <td>Pedro Santos</td>
                                <td>
                                    <button className="acessar-turma">Acessar turma</button>
                                    <button className="editar-turma">Editar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>4º ano A</td>
                                <td>Carla Soares</td>
                                <td>
                                    <button className="acessar-turma">Acessar turma</button>
                                    <button className="editar-turma">Editar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>5º ano A</td>
                                <td>Roberto Alves</td>
                                <td>
                                    <button className="acessar-turma">Acessar turma</button>
                                    <button className="editar-turma">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={mostraCadastroTurma} id="cadastro-turma">Cadastrar Nova Turma</button>
                </section>

                <section>
                    <h2>Professores</h2>
                    <ul>
                        <li>João da Silva</li>
                        <li>Maria Oliveira</li>
                        <li>Pedro Santos</li>
                        <li>Carla Soares</li>
                        <li>Roberto Alves</li>
                    </ul>
                </section>
            </div >

        </>


    );
}