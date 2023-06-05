import { useModalContext } from "@/contexts/ModalContext";
import { useApi } from "@/service/api-service";
import { useEffect, useState } from "react";

type dataSelectHorario = {
    data: {
        getHorario: (horario: any) => Promise<void>;
    };
};

export default function SelectHorario({ data }: dataSelectHorario) {
    const { mostraSelectHorario } = useModalContext();

    const [dia, setDia] = useState<any>("");
    const [formData, setFormData] = useState<any>();
    const [ordem, setOrdem] = useState<any>("");


    useEffect(() => {
        setFormData({
            ordem: ordem,
            dia: dia,
        });
    }, [dia, ordem]);

    let handleSubmit = (event: any) => {
        try {
            event.preventDefault();
            console.log(formData);

        } catch (err) {
            console.log(err);
        }
    };

    <style jsx>{`
        .edu {
            background-color: #fff;
            position: fixed;
            top: 0;
            height: 50%;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 10%;
        }
    `}</style>;

    return (
        <>
            <div className="container edu">
                <form
                    onSubmit={handleSubmit}
                    style={{

                        position: "fixed",
                        top: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        zIndex: 999,
                    }}
                >
                    <div
                        style={{

                            background: "#fff",
                            width: "50%",
                            height: "50%",
                            gap: "10px",
                        }}
                        className="container">

                        <h1>Selecione o horário</h1>
                        <label>
                            Data:
                            <input className="form-control"
                                type="date"
                                value={dia}
                                onChange={(event) => setDia(event.target.value)}
                            />
                        </label>
                        <br />
                        <label htmlFor="ordem">Ordem:</label>
                        <select id="ordem" value={ordem} onChange={(event) => setOrdem(event.target.value)}>
                            <option value="">Selecione...</option>
                            <option value="1">1º Aula</option>
                            <option value="2">2º Aula</option>
                        </select>
                        <br />
                        <div className="col-md-12 form-group">
                            <button
                                onClick={() => {
                                    mostraSelectHorario();
                                }}
                                type="button"
                                className="btn btn-danger">
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    data.getHorario(formData);
                                }}
                                type="button"
                                className="btn btn-success">
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
