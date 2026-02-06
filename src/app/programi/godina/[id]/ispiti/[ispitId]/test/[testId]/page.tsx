
import {Tema, testListElem} from "@/app/models";

import TemaList from "@/app/ui/teme";
import Link from "next/link";
import dbPool from "@/app/lib/myslq";

async function getData(id:number){
    const conn = dbPool;
    const [list] = await conn.query(`SELECT ip.korisnik as korisnik, u.name as ime, ip.ID as ispit FROM ispiti.ispit i left join ispiti.ispit_profil ip on i.ID = ip.ispit  left join auth.user u on u.email=ip.korisnik where i.ID = ${id}`);
   // console.log(list);
    return list;
}
export default async function Page({params}:{params:Promise<{ispitId:number}>})
{
    const {ispitId} = await params;
    const testovi = await getData(ispitId)  as testListElem[];

    return (
        <section className={`p-8`}>
            {
                testovi.map((korisnik) => (
                    <Link key={`korisnik.korsinik`} href={`test/${korisnik.ispit}`}>{korisnik.ime}</Link>
                ))
            }
        </section>
    )
}