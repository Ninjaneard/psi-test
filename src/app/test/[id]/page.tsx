
import {studentTestRezultati, Tema, testIspit, testPitanje} from "@/app/models";

import TemaSingle from "@/app/ui/tema";
import dbPool from "@/app/lib/myslq";
import Test from "@/app/ui/test.tsx";
import {RowDataPacket} from "mysql2";
import {auth} from "../../../../auth.ts";

async function getData(id:number){

    const conn = dbPool;
    console.log(id);
    const [rows] = await conn.execute(`SELECT ispiti.ispit_profil.korisnik as korisnik,  ip.ID as testPitanjeID , p.ID as pitanjeID, p.Pitanje as pitanje, p.Odgovor as opOdgovor, o.Odgovor as Odgovor, o.tacan as tacan, p.izbor as izbor, p.opisno as opisno, o.ID as odgovorID FROM ispiti.ispit_profil left join ispiti.ispit i on i.ID = ispit_profil.ispit left join ispiti.ispit_pitanja ip on i.ID = ip.ispit left join ispiti.pitanja p on p.id=ip.pitanje left join ispiti.odgovori o on o.pitanje = p.ID where ispiti.ispit_profil.ID=${id}`);
    const result = new Array<testPitanje>();
   // const listaPitanja = list[0];
    console.log(rows);
    let korisnik = "";
    for(const pitanje of rows as RowDataPacket[]){
        korisnik = pitanje.korisnik;
        console.log(pitanje.izbor[0]);
        const test = result.find((item) => item.PitanjeID == pitanje.pitanjeID)
        if(test == undefined)
        {

            result.push({
                TestPitanjeID: pitanje.testPitanjeID,
                Pitanje: pitanje.pitanje,
                PitanjeID: pitanje.pitanjeID,
                Izbor: pitanje.izbor[0] == 1 ? true: false ,
                Opisno: pitanje.opisno[0] == 1 ? true: false ,
                Odgovori: [
                    {
                        odgovorID: pitanje.odgovorID,
                        Odgovor: pitanje.Odgovor,
                        Tacan: pitanje.tacan != null && pitanje.tacan[0] == 1 ? true: false
                    }
                ]
            });
        }
        else {
            result[result.indexOf(test)].Odgovori.push({odgovorID: pitanje.odgovorID, Odgovor: pitanje.Odgovor, Tacan: pitanje.tacan != null && pitanje.tacan[0] == 1 ? true: false})
        }

    }
    const test: testIspit = {
        Pitanja: result,
        Ispit: id,
        Date: new Date(),
        Ispitanik: korisnik
    }
    return test;
}

async function getresults(id:number){
    const conn = dbPool;
    const query = `SELECT ip.ID as ID, o.pitanje as Pitanje, o.rezultat as Rezultat FROM ispiti.ispit_profil ip LEFT JOIN ispiti.ispit i on i.ID = ip.ispit LEFT JOIN ispiti.ispit_pitanja p on i.ID = p.ispit left join ispiti.ispit_odgovor o on p.ID = o.pitanje AND o.korisnik=ip.korisnik WHERE ip.ID = ${id}`;
    const [rows] = await conn.query(query) as unknown as Array<studentTestRezultati>;
    let pregledan = false;
    let rezultat = 0;
    let odgovoren = false;
    for(const row of rows as unknown as Array<studentTestRezultati>){
        if(row.Rezultat != null)
        {
            pregledan = true;
            rezultat += row.Rezultat;
        }
        if(row.Pitanje != null)
        {
            odgovoren = true;
        }
    }
    return {pregledan, rezultat, odgovoren};
}
export default async function Page({params}:{params:Promise<{id:number}>})
{
    const session = await auth()
    console.log(session);
    if(session == undefined || session.user == undefined) return <div>Niste prijavljeni</div>;

    const {id} = await params;
    const pitanja = await getData(id) as unknown as testIspit;
    const res= await getresults(id);
    if(session.user.email != pitanja.Ispitanik) return <div>Pogresan korisnik</div>
    console.log(pitanja);
    if(res.pregledan && res.odgovoren && res.rezultat != 0)
        return <div>Rezultat: {res.rezultat}</div>;
    else if(!res.pregledan)
        return <div>Ispit jos nije pregledan</div>;
    else if(!res.odgovoren )
        return (
            <section className={`p-8`}>
                <Test test={pitanja}></Test>
            </section>
        );
}