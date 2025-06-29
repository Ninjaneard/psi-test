import { Tema} from "@/app/models";
import QuestionForm from "@/app/ui/questionForm";
import QuestionsList from "@/app/ui/Questions";

export default async function  TemaSingle({tema}: { tema: Tema }){

    return (
        <div>
            <ul>
               <h2>{tema.naziv}</h2>
                <p>{tema.Opis}</p>
            </ul>
            <QuestionsList tema={tema.ID}></QuestionsList>
            <QuestionForm temaID={tema.ID}></QuestionForm>
        </div>
    )
}