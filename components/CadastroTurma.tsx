import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import React from "react";

export default function CadastroTurma(props: any) {
  const { apiPost } = useApi();
  const { mostraCadastroTurma } = useModalContext();
  const [formValue, setformValue] = React.useState({
    ano: "",
    idProf: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const turmFormData = new FormData();
    turmFormData.append("ano", formValue.ano);
    turmFormData.append("idProf", formValue.idProf);
    try {
      const response = await apiPost("escola/turma", turmFormData, {
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
