import { useApi } from "@/service/api-service";
import { useEffect, useState } from "react";

type TurmaType = {
  id: string;
};

export default function App() {
  const [turmas, setTurmas] = useState<TurmaType[]>([]);
  const { apiGet } = useApi();

  useEffect(() => {
    resgataTurmas();
  }, []);

  useEffect(() => {
    mapeiaTurmas(turmas);
  }, [turmas]);

  async function resgataTurmas() {
    const response = await apiGet("/turmas/");
    const { data } = response;
    setTurmas(data);
  }

  function mapeiaTurmas(turmasRecebias: TurmaType[]) {
    turmasRecebias.map((turma) => {});
  }

  return <div className="App"></div>;
}
