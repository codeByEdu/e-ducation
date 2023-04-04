import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import { useEffect, useState } from "react";

export default function CadastroProfessor() {
  const { apiGet } = useApi();
  const { mostraCadastroProfessor } = useModalContext();
  const [turmas, setTurmas] = useState<[any]>();
  const [tipos, setTipos] = useState<[any]>();
  useEffect(() => {
    listaTurmas();
    listaTipos();
  }, []);

  async function listaTurmas() {
    const { data } = await apiGet("/escola/turmas");
    setTurmas(data);
  }

  async function listaTipos() {
    const { data } = await apiGet("/professor/tipos");
    setTipos(data);
  }

  return (
    <>
      <div className="container">
        <form
          style={{
            position: "fixed",
            top: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="form-group row">
            <div className="col">
              <input type="text" className="form-control" placeholder="Nome" />
            </div>
            <br />

            <div className="col">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>

            <select className="form-control" style={{ width: "30%" }}>
              <option value="">Selecione o tipo</option>
              {tipos?.map((tipo: any) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descricao}
                </option>
              ))}
            </select>
          </div>

          <br />
          <select className="form-control" style={{ width: "30%" }}>
            <option value="">Selecione a turma</option>
            {turmas?.map((turma: any) => (
              <option key={turma.codigo} value={turma.codigo}>
                {turma.ano}
              </option>
            ))}
          </select>
          <button
            onClick={mostraCadastroProfessor}
            type="button"
            className="btn btn-danger"
          >
            Cancelar
          </button>
          <button type="button" className="btn btn-success">
            Adicionar
          </button>
        </form>
      </div>
    </>
  );
}
