import { text } from "stream/consumers";


export default function CadastroAluno () {
    return(
        <div>
        <form id="formAluno" >
            <label >Nome do aluno</label>
            <input type= "text" id="nomeAluno"></input>
            <label >Email responsavel</label>
            <input type= "text" id="emailResponsavel"></input>
            <input type="radio" id="html" name="fav_language" value="HTML"></input>
            <label >Masculino</label>
            <input type="radio" id="css" name="fav_language" value="CSS"></input>
            <label>Feminino</label>
            <label htmlFor="turma">Turma</label>
            <select name="turma" id="turma">
                <option value="6a">6A</option>
                <option value="1a">1A</option>
                <option value="3a">3A</option>
            </select>
        </form>
        
        </div>
    )
}