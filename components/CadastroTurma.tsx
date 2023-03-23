import { useModalContext } from "@/contexts/ModalContext";
import React from "react";

export default function CadastroTurma(props: any) {
    const { mostraCadastroTurma } = useModalContext()

    return (

        <>
            <form style={{
                position: "fixed", top: "0", display: "flex",
                justifyContent: "center", alignItems: "center", flexDirection: "column",
            }}>
                < section >
                    <h2>Cadastrar Nova Turma</h2>
                    <label htmlFor="nome-turma">Nome da Turma:</label>
                    <input type="text" id="nome-turma" name="nome-turma" />
                    <label htmlFor="professor">Professor Responsável:</label>
                    <select id="professor" name="professor" >
                        <option value="">Selecione o professor</option>
                        {props.professor?.map((prof: any) => (
                            <option key={prof.id} value={prof.id}>{prof.nome}</option>
                        ))}

                    </select>

                    <button type="submit">Salvar</button>
                    <button onClick={mostraCadastroTurma} type="button" id="cancelar-cadastro-turma">
                        Cancelar
                    </button>
                </section>
            </form >
        </>


    );
}