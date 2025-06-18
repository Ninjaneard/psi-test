import {Godina, Program, Tema} from "@/app/models";
import Link from "next/link";

export default async function  TemaList({teme}: { teme: Array<Tema> }){

    return (
        <div>
            <ul>
                { teme.map((tema)=>(
                    <li key={tema.ID}><Link href={`/tema/${tema.ID}`} >{tema.naziv}</Link></li>
                ))
                }
            </ul>
        </div>
    )
}