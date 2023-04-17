import { useRouter } from "next/router";
import { useEffect } from "react";

function Turma() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      <p>OI {id}</p>
    </div>
  );
}

export default Turma;
