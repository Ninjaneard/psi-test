import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import IspitForm from "@/app/ui/ispitForm";
import {Tema} from "@/app/models";


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
    //let godina = params.id;
    let teme = await getData(params.id) as Array<Tema>;
    return (
        <section className={`p-10`}>
            <IspitForm teme={teme}></IspitForm>
        </section>
    )
}