
import { Tema} from "@/app/models";

import TemaList from "@/app/ui/teme";
import Link from "next/link";
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
    console.log(teme);
    return (
        <section className={`p-8`}>
            <TemaList teme={teme}></TemaList>
            <Link className={'border-4 border-teal-600 bg-teal-400 p-4 m-8 block'} href={`${id}/ispit`}>Napravi Ispit</Link>
        </section>
    )
}