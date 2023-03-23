import { useModalContext } from "@/contexts/ModalContext";
import api from "@/pages/api/api";
import { useEffect, useState } from "react";

export default function CadastroProfessor() {
    const { mostraCadastroProfessor } = useModalContext()
    const [turmas, setTurmas] = useState<[any]>();
    const [tipos, setTipos] = useState<[any]>();
    useEffect(() => {
        api
            .get("/escola/turmas")
            .then((response) => setTurmas(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);
    useEffect(() => {
        api
            .get("/professor/tipos")
            .then((response) => setTipos(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);
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
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>

                        <select className="form-control" style={
                            { width: "30%" }}>
                            <option value="">Selecione o tipo</option>
                            {tipos?.map((tipo: any) => (
                                <option key={tipo.id} value={tipo.id}>{tipo.descricao}</option>
                            ))}

                        </select>
                    </div>

                    <br />
                    <select className="form-control" style={
                        { width: "30%" }}>
                        <option value="">Selecione a turma</option>
                        {turmas?.map((turma: any) => (
                            <option key={turma.codigo} value={turma.codigo}>{turma.ano}</option>
                        ))}

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