
import {Program} from "@/app/models";
import Link from "next/link";
import dbPool from "@/app/lib/myslq";

async function getData(){

    const conn = dbPool;
    const list = await conn.query("SELECT * FROM program");
    //console.log(list);
    return list[0];
}
export default async function  ProgramList(){
    const data = await getData() as Array<Program>
   // console.log(data);
    return (
        <div>
            <ul>
                { data.map((program)=>(
                    <li key={program.ID}><Link href={`/programi/${program.ID}`} >{program.naziv}</Link></li>
                ))
                }
            </ul>
        </div>
    )
}