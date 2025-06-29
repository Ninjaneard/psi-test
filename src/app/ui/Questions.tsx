import {Godina, Pitanje, Program, Tema} from "@/app/models";
import Link from "next/link";
import QuestionForm from "@/app/ui/questionForm";
import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import dbPool from "@/app/lib/myslq";

async function getQuestions(temaID){
    const conn = dbPool;
    var list = await conn.query(`SELECT * FROM pitanja WHERE tema=${temaID}`);
    console.log(list);
    return list[0];
}
export default async function  QuestionsList({tema}: { tema: number }){
    var pitanja = await getQuestions(tema) as Array<Pitanje>;
    console.log(pitanja);
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