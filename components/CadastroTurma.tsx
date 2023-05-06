import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import React, { useEffect, useState } from "react";
type dataCadastroTurma = {
  data: {
    addTurma: (turma: any) => Promise<void>;
    updateTurma: (turma: any) => Promise<void>;
    turma: any;
    profs: any;
  };
};
export default function CadastroTurma({ data }: dataCadastroTurma) {
  const { apiPost } = useApi();
  const { mostraCadastroTurma } = useModalContext();
  const [formData, setFormData] = useState<any>(data.turma);
  const [ano, setAno] = useState("");
  const [idProf, setIdProf] = useState(0);

  useEffect(() => {
    setFormData({
      ano: data?.turma && data.turma.ano ? data.turma.ano : ano,
      idProfessor: data?.turma && data.turma.idProf ? data.turma.idProf : idProf,
    });
  }, [ano, idProf]);

  useEffect(() => {
    console.log(formData);
  }, [formData])

  let handleSubmit = (event: any) => {
    try {
      event.preventDefault();
      if (data?.turma && data.turma.id) {
        data.updateTurma(formData);
      } else {
        data.addTurma(formData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  let button;
  if (data?.turma && data.turma.id) {
    button = (
      <button type="submit" className="btn btn-success">
        Atualizar
      </button>
    );
  } else {
    button = (
      <button type="submit" className="btn btn-success">
        Cadastrar
      </button>
    );
  }

  return (
    <>
      <form
        style={{
          position: "fixed",
          top: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <section>
          <h2>Cadastrar Nova Turma</h2>
          <label htmlFor="nome-turma">Nome da Turma:</label>
          <input
            type="text"
            id="nome-turma"


            onChange={(event) => setAno(event.target.value)}
            name="nome-turma"
          />
          <label htmlFor="professor">Professor Responsável:</label>
          <select id="professor" name="professor"
            onChange={(event) => setIdProf(parseInt(event.target.value))}>
            <option value="">Selecione o professor</option>
            {data.profs?.map((prof: any) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </select>

          {button}
        </section>
      </form>
    </>
  );
}
