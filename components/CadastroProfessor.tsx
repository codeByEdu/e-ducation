import { useModalContext } from "@/contexts/ModalContext";
import { useState } from "react";

export default function CadastroProfessor() {
    const { mostraCadastroProfessor } = useModalContext()

    return (

        <>
            <div className="container" >
                <form style={{
                    position: "fixed", top: "0", display: "flex",
                    justifyContent: "center", alignItems: "center", flexDirection: "column",

                }}>
                    <div className="form-group row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Nome" />
                        </div>
                        <br />
                        <div className="col">
                            <input className="form-control" placeholder="Sobrenome" type="text" />
                        </div>

                        <div className="col">
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>


                    </div>

                    <br /><select className="form-control" style={
                        { width: "30%" }}>
                        <option> Turmas</option>
                        <option value={1}>1°A</option>
                        <option value={2}>2°A</option>
                        <option value={3}>3°A</option>
                        <option value={4}>4°A</option>
                        <option value={5}>5°A</option>
                        <option value={6}>1°B</option>
                        <option value={6}>2°B</option>
                        <option value={6}>3°B</option>
                        <option value={6}>4°B</option>
                        <option value={6}>5°B</option>
                    </select>
                    <select className="form-control" style={
                        { width: "30%" }}>
                        <option>Disciplinas</option>
                        <option value={1}>Matemática</option>
                        <option value={2}>Português</option>
                        <option value={3}>História</option>
                        <option value={4}>Geografia</option>
                        <option value={5}>Inglês</option>
                        <option value={6}>Educação Física</option>
                    </select>
                    <button
                        onClick={mostraCadastroProfessor}
                        type="button"
                        className="btn btn-danger"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                    >
                        Adicionar
                    </button>
                </form>
            </div>
        </>

    );

}