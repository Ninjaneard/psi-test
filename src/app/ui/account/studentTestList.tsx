import dbPool from "@/app/lib/myslq.ts";
import {studentTest} from "@/app/models";
import Link from "next/link";


async function getLista (email: string)
{
     const query = `SELECT ip.ID as ID, i.datum as Datum, ip.korisnik as Korisnik, g.naziv as Godina, p.naziv as Program  FROM ispiti.ispit_profil ip Left Join ispiti.ispit i on i.ID = ip.ispit left join ispiti.godina g on g.ID = i.godina left join ispiti.program p on g.program = p.ID WHERE ip.korisnik = '${email}'`;
     const [rows] = await dbPool.query(query) as unknown as studentTest[];
     return rows;
}

export  default async function StudentTestList ({email}: {email:string}){
     const data: studentTest[] = await getLista(email)  as unknown as studentTest[];
     return (
         <div>
             <ol>
                  {
                    data.map((ispit:studentTest) => (
                        <li key={ispit.ID}><Link href={`/test/${ispit.ID}`}>{ispit.Program} - {ispit.Godina} - {ispit.Datum.toDateString()}</Link> </li>
                    ))
                  }
             </ol>
         </div>
     )
}