
export default function CadastroAluno() {
    return (
        <>
            <form>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Nome" />
                    </div>
                    <br />
                    <div className="col">
                        <input className="form-control" placeholder="Sobrenome" type="text" />
                    </div>
                </div>

                <br />
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="inputPassword6"
                        className="form-control mx-sm-3"
                        aria-describedby="passwordHelpInline"
                    />
                    <small
                        style={{ marginLeft: "4%" }}
                        id="passwordHelpInline"
                        className="text-muted"
                    >
                        Deve ter entre 8 e 20 caracteres.
                    </small>
                </div>
                <br />
                <select style={{ width: "28%", marginLeft: "3%" }} className="custom-select">
                    <option >Turmas</option>
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
                <br />
                <br />
                <select className="custom-select">
                    <option >Disciplinas</option>
                    <option value={1}>Matemática</option>
                    <option value={2}>Português</option>
                    <option value={3}>História</option>
                    <option value={4}>Geografia</option>
                    <option value={5}>Inglês</option>
                    <option value={6}>Educação Física</option>
                </select>
                <br />
                <br />
                <button

                    type="button"
                    className="btn btn-success"
                >
                    Adicionar
                </button>
            </form>
        </>

    )
} 