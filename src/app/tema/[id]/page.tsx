import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import {Godina, Tema} from "@/app/models";
import GodinaList from "@/app/ui/godine";
import TemaSingle from "@/app/ui/tema";
import dbPool from "@/app/lib/myslq";

async function getData(id:number){
    const conn = dbPool;
    var list = await conn.query(`SELECT * FROM tema WHERE ID=${id}`);
    console.log(list);
    return list[0];
}
export default async function Page({params}:{params:{id:number}})
{
    let tema = await getData(params.id) as Tema;
    console.log(tema);
    return (
        <section className={`p-8`}>
            <TemaSingle tema={tema[0]}>

            </TemaSingle>
        </section>
    )
}