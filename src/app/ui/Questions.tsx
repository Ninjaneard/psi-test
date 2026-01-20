import {Pitanje, Tema} from "@/app/models";

import dbPool from "@/app/lib/myslq";

async function getQuestions(temaID:number){
    const conn = dbPool;
    //console.log(temaID);
    const list = await conn.query(`SELECT * FROM pitanja WHERE tema=${temaID}`);
   // console.log(list);
    return list[0];
}
export default async function  QuestionsList({temaID}: { temaID: Tema }){
    const pitanja = await getQuestions(temaID.ID) as Array<Pitanje>;

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