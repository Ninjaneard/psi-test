import { Pitanje} from "@/app/models";

import dbPool from "@/app/lib/myslq";

async function getQuestions(temaID:number){
    const conn = dbPool;
    const list = await conn.query(`SELECT * FROM pitanja WHERE tema=${temaID}`);
   // console.log(list);
    return list[0];
}
export default async function  QuestionsList({tema}: { tema: number }){
    const pitanja = await getQuestions(tema) as Array<Pitanje>;
  //  console.log(pitanja);
    return (
        <div>
            Pitanja:
            <ol>
                {
                    pitanja.map((pitanje) => (
                        <li key={pitanje.ID}>{pitanje.Pitanje}</li>
                    ))
                }
            </ol>

        </div>
    )
}