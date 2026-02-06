
import {Tema, testListElem} from "@/app/models";

import TemaList from "@/app/ui/teme";
import Link from "next/link";
import dbPool from "@/app/lib/myslq";
import UcesniciPrijava from "@/app/ui/test-ui/ucesniciPrijava.tsx";
import {auth} from "../../../../../../../auth.ts";
import {redirect} from "next/navigation";

async function getData(id:number){
    const conn = dbPool;
    const [list] = await conn.query(`SELECT ip.korisnik as korisnik, u.name as ime, ip.ID as ispit FROM ispiti.ispit i left join ispiti.ispit_profil ip on i.ID = ip.ispit  left join auth.user u on u.email=ip.korisnik where i.ID = ${id}`);
  //  console.log(list);
    return list;
}
export default async function Page({params}:{params:Promise<{ispitId:number}>})
{
    const {ispitId} = await params;
    const testovi = await getData(ispitId)  as testListElem[];
    const user = await auth()
    if(user && user.user != null && user.user.role == "Admin")
        return (
            <section className={`p-8`}>
                <ol>
                {
                    testovi.map((korisnik) => (
                        console.log(korisnik.korisnik),
                       <li key={korisnik.ispit} > <Link className={`text-blue-500 hover:text-blue-700 border-b-cyan-950 border-b-2`} href={`test/${korisnik.ispit}`}>{korisnik.ime?korisnik.ime:korisnik.korisnik}</Link> </li>
                    ))
                }
                </ol>
                <UcesniciPrijava ispitID={ispitId}/>
            </section>
        )
    else redirect(`/account`);
}