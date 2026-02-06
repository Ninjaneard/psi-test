import {Godina, IspitModel} from "@/app/models";
import GodinaList from "@/app/ui/godine";
import dbPool from "@/app/lib/myslq";
import IspitList from "@/app/ui/lista-ispita.tsx";
import {auth} from "../../../../../../auth.ts";
import {redirect} from "next/navigation";

async function getData(id:number){
    const conn = dbPool;
    const query = `SELECT * FROM ispit WHERE godina=${id}`;
    const [rows] = await conn.query(query) as Array<any>;
    return rows;
}
export default async function Page({params}:{params:Promise<{id:number}>})
{
    const {id} = await params;
    const data = await getData(id);
    //console.log(godine);
    const user = await auth()
    if(user && user.user != null && user.user.role == "Admin")
        return (
            <section className={`p-8`}>
                <IspitList ispiti={data}></IspitList>
            </section>
        )
    else redirect(`/account`);
}