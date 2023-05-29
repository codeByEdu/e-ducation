import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import { useEffect, useState } from "react";

type CadastroProfessorProps = {
  data: {
    addProf: (prof: any) => Promise<void>;
    updateProf: (prof: any) => Promise<void>;
    listarProfessores: () => Promise<void>;
    professor: any;
  };
};

export default function CadastroProfessor({ data }: CadastroProfessorProps) {
  const { apiGet } = useApi();
  const { mostraCadastroProfessor } = useModalContext();
  const [tipos, setTipos] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState(0);
  const [formData, setFormData] = useState<any>(data.professor);

  useEffect(() => {
    listaTipos();
    if (data?.professor && data.professor.id) {
      setEmail(data.professor.email);
      setNome(data.professor.nome);
    }
  }, []);


  useEffect(() => {
    setFormData({
      id: data?.professor && data.professor?.id,
      nome: nome ? nome : data.professor?.nome,
      email: email ? email : data.professor?.email,
      tipoProfessor: {
        id: tipo ? tipo : data.professor?.tipo,
        descricao: "null",
      },
    });
  }, [nome, email, tipo]);

  let handleSubmit = (event: any) => {
    try {
      event.preventDefault();
      console.log(formData);
      if (data?.professor && data.professor.id) {
        data.updateProf(formData);
      } else {
        data.addProf(formData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function listaTipos() {
    const { data } = await apiGet("/professor/tipos");
    console.log(data);
    setTipos(data);
  }

  let button;
  if (data?.professor && data.professor.id) {
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
      <div className="container">
        <form
          onSubmit={handleSubmit}
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
              <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                className="form-control"
                placeholder="Nome"
              />
            </div>
            <br />

            <div className="col">
              <input
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
                placeholder="Email"
              />
            </div>

            <select
              required
              className="form-control"
              style={{ width: "30%" }}
              onChange={(event) => setTipo(parseInt(event.target.value))}
            >
              <option value="">Selecione o tipo</option>
              {tipos?.map((tipo: any) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descricao}
                </option>
              ))}
            </select>
          </div>

          <br />

          <button
            onClick={() => {
              mostraCadastroProfessor();
              data.listarProfessores;
            }}
            type="button"
            className="btn btn-danger"
          >
            Cancelar
          </button>
          {button}
        </form>
      </div>
    </>
  );
}
