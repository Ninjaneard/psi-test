
import { Tema} from "@/app/models";

import TemaSingle from "@/app/ui/tema";
import dbPool from "@/app/lib/myslq";

async function getData(id:number){
    const conn = dbPool;
    const list = await conn.query(`SELECT * FROM tema WHERE ID=${id}`);
   // console.log(list);
    return list[0];
}
export default async function Page({params}:{params:Promise<{id:number}>})
{
    const {id} = await params;
    const tema = await getData(id) as unknown as Tema;
   // console.log(tema);
    return (
        <section className={`p-8`}>
            <TemaSingle tema={tema}>

            </TemaSingle>
        </section>
    )
}