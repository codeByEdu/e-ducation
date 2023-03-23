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

                        <tr>
                            <th>Nome da Disciplina</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas?.map(disc => (
                            <tr>
                                <td>{disc.nome}</   td>
                                <td>
                                    <Article size={30}></Article>
                                    <Pencil size={30}></Pencil>
                                </td>
                            </tr>

                        ))}


                    </tbody>
                </table>
                <button className="btn btn-success" id="cadastro-disciplina">Cadastrar Nova disciplina</button>


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