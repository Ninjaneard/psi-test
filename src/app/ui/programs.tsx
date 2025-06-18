import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import {Program} from "@/app/models";
import Link from "next/link";

async function getData(){
    const access: PoolOptions = {
        user: 'root',
        database: 'ispiti',
        password: 'nov1987'
    };
    const conn = mysql.createPool(access);
    var list = await conn.query("SELECT * FROM program");
    console.log(list);
    return list[0];
}
export default async function  ProgramList(){
    var data = await getData() as Array<Program>
    console.log(data);
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