import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import {Godina, Tema} from "@/app/models";
import GodinaList from "@/app/ui/godine";
import TemaList from "@/app/ui/teme";

async function getData(id:number){
    const access: PoolOptions = {
        user: 'root',
        database: 'ispiti',
        password: 'nov1987'
    };
    const conn = mysql.createPool(access);
    var list = await conn.query(`SELECT * FROM tema WHERE godina=${id}`);
    console.log(list);
    return list[0];
}
export default async function Page({params}:{params:{id:number}})
{
    let teme = await getData(params.id) as Array<Tema>;
    console.log(teme);
    return (
        <section className={`p-8`}>
            <TemaList godine={teme}></TemaList>
        </section>
    )
}