import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import {Godina} from "@/app/models";
import GodinaList from "@/app/ui/godine";

async function getData(id:number){
    const access: PoolOptions = {
        user: 'root',
        database: 'ispiti',
        password: 'nov1987'
    };
    const conn = mysql.createPool(access);
    var list = await conn.query(`SELECT * FROM godina WHERE program=${id}`);
    console.log(list);
    return list[0];
}
export default async function Page({params}:{params:{id:number}})
{
    let godine = await getData(params.id) as Array<Godina>;
    console.log(godine);
    return (
        <section className={`p-8`}>
            <GodinaList godine={godine}></GodinaList>
        </section>
    )
}