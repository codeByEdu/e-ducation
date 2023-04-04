import { useModalContext } from "@/contexts/ModalContext";
import api from "@/pages/api/api";
import React from "react";

export default function CadastroTurma(props: any) {
  const { mostraCadastroTurma } = useModalContext();

  const [formValue, setformValue] = React.useState({
    ano: "",
    idProf: "",
  });

  const handleSubmit = async (event: any) => {
    // store the states in the form data
    const turmFormData = new FormData();
    turmFormData.append("ano", formValue.ano);
    turmFormData.append("idProf", formValue.idProf);

    try {
      // make axios post request
      const response = await api.post("escola/turma", turmFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.ano]: event.target.value,
    });
  };

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
            value={props.turma?.ano}
            onChange={handleChange}
            name="nome-turma"
          />
          <label htmlFor="professor">Professor Responsável:</label>
          <select id="professor" name="professor">
            <option value="">Selecione o professor</option>
            {props.professor?.map((prof: any) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </select>

          <button type="submit">Salvar</button>
          <button
            onClick={mostraCadastroTurma}
            type="button"
            id="cancelar-cadastro-turma"
          >
            Cancelar
          </button>
        </section>
      </form>
    </>
  );
}
