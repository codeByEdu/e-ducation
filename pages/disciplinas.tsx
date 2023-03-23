import { Article, Option, Pencil } from "phosphor-react";
import React, { useEffect, useState } from "react";
import api from "./api/api";


export default function Disciplina() {


    const [disciplinas, setDisciplinas] = useState<[any]>();

    useEffect(() => {
        api.get("/escola/disciplinas")
            .then((response) => setDisciplinas(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);



    return (
        <>
            <div className="container">

                <h2>Disciplinas</h2>
                <table className="table-primary">
                    <thead>
                        {disciplinas?.map(disc => (
                            <tr>
                                <th>{disc.nome}</th>
                            </tr>

                        ))}
                        <tr>
                            <th>Nome da Disciplina</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Português</td>
                            <td>1º ano A</td>
                            <td>
                                <Article size={30}></Article>
                                <Pencil size={30}></Pencil>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <button className="btn btn-success" id="cadastro-disciplina">Cadastrar Nova disciplina</button>

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
                <section>
                    <h2>Turmas</h2>
                    <ul>
                        <li>1º ano A</li>
                        <li>2º ano A</li>
                        <li>3º ano A</li>
                        <li>4º ano A</li>
                        <li>5º ano A</li>
                    </ul>
                </section>
            </div>
            {/* Formulário de cadastro de disciplinas */}
            <form id="form-cadastro-disciplina">
                <section>
                    <h2>Cadastrar Nova disciplina</h2>
                    <label htmlFor="nome-disciplina">Nome da disciplina:</label>
                    <input
                        type="text"
                        id="nome-disciplina"
                        name="nome-disciplina"

                    />
                    <label htmlFor="professor">Professor Responsável:</label>
                    <select className="custom-select" id="professor" name="professor" >
                        <option value="">Selecione o professor</option>

                        <option value="João da Silva">João da Silva</option>
                        <option value="Maria Oliveira">Maria Oliveira</option>
                        <option value="Pedro Santos">Pedro Santos</option>
                        <option value="João da Silva">Carla Soares</option>
                        <option value="Maria Oliveira">Roberto Matos</option>
                    </select>
                    <label htmlFor="turma">Turma:</label>
                    <select className="custom-select" id="turma" name="turma" >
                        <option value="">Selecione a turma</option>
                        <option value="1ano">1º ano A</option>
                        <option value="2ano">2º ano A</option>
                        <option value="3ano">3º ano A</option>
                        <option value="4ano">4º ano A</option>
                        <option value="5ano">5º ano A</option>
                    </select>
                    <button type="submit">Salvar</button>
                    <button type="button" id="cancelar-cadastro-disciplina">
                        Cancelar
                    </button>
                </section>
            </form>
            {/* Script para exibir e esconder o formulário de cadastro de disciplinas */}
        </>

    );
}