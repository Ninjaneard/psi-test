
import IspitForm from "@/app/ui/ispitForm";
import {Tema} from "@/app/models";
import dbPool from "@/app/lib/myslq";


async function getData(id:number){
    const conn = dbPool;
    const list = await conn.query(`SELECT * FROM tema WHERE godina=${id}`);
    console.log(list);
    return list[0];
}
export default async function Page({params}:{params:Promise<{id:number}>})
{
    const {id} = await params;
    const teme = await getData(id) as Array<Tema>;
    return (
        <section className={`p-10`}>
            <IspitForm teme={teme} godina={id}></IspitForm>
        </section>
    )
}