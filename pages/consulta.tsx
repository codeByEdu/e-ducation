import CadastroProfessor from "@/components/CadastroProfessor";
import { useModalContext } from "@/contexts/ModalContext";
import React, { useState } from "react";





export default function ConsultaProfessor() {

    const { mostraCadastroProfessor, activeModal } = useModalContext()

    return (
        <div className="container">
            {activeModal && <CadastroProfessor />}
            <table style={{ width: "100%" }} className="table-primary table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th style={{ textAlign: "left" }} scope="col">
                            Nome
                        </th>
                        <th style={{ textAlign: "left" }} scope="col">
                            Sobrenome
                        </th>
                        <th style={{ textAlign: "left" }} scope="col">
                            Email
                        </th>
                        <th style={{ textAlign: "left" }} scope="col">
                            Turma
                        </th>
                        <th style={{ textAlign: "left" }} scope="col">
                            Disciplina
                        </th>
                        <th style={{ textAlign: "left" }} scope="col" />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>João</td>
                        <td>Silva</td>
                        <td>joao@professor.com</td>
                        <td>1° A</td>
                        <td>Matemática</td>
                        <td>
                            <button type="button" className="btn btn-secondary btn-sm">
                                Editar
                            </button>
                            <button type="button" className="btn btn-danger btn-sm">
                                Deletar
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>joao@professor.com</td>
                        <td>1° A</td>
                        <td>Português</td>
                        <td>
                            <button type="button" className="btn btn-secondary btn-sm">
                                Editar
                            </button>
                            <button type="button" className="btn btn-danger btn-sm">
                                Deletar
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>João</td>
                        <td>Silva</td>
                        <td>joao@professor.com</td>
                        <td>1° A</td>
                        <td>Inglês</td>
                        <td>
                            <button type="button" className="btn btn-secondary btn-sm">
                                Editar
                            </button>
                            <button type="button" className="btn btn-danger btn-sm">
                                Deletar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" onClick={mostraCadastroProfessor} className="btn btn-success">Adicionar professor</button>
        </div>

    );

}