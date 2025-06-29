import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import {Godina} from "@/app/models";
import GodinaList from "@/app/ui/godine";
import dbPool from "@/app/lib/myslq";

async function getData(id:number){
    const conn = dbPool;
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