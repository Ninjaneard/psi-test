
import {Tema, testIspit, testPitanje} from "@/app/models";

import TemaSingle from "@/app/ui/tema";
import dbPool from "@/app/lib/myslq";
import Test from "@/app/ui/test.tsx";

async function getData(id:number){
    const conn = dbPool;
    const list = await conn.query(`SELECT ip.ID as testPitanjeID , p.ID as pitanjeID, p.Pitanje as pitanje, p.Odgovor as opOdgovor, o.Odgovor as Odgovor, o.tacan as tacan, p.izbor as izbor, p.opisno as opisno, o.ID as odgovorID FROM ispiti.ispit_profil join ispiti.ispit i on i.ID = ispit_profil.ispit join ispiti.ispit_pitanja ip on i.ID = ip.ispit join ispiti.pitanja p on p.id=ip.ID join ispiti.odgovori o on o.pitanje = p.ID where ispiti.ispit_profil.ID=${id}`);
    const result = new Array<testPitanje>();
    for(const pitanje of list[0]){
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
                        Tacan: pitanje.tacan[0] == 1 ? true: false
                    }
                ]
            });
        }
        else {
            result[result.indexOf(test)].Odgovori.push({odgovorID: pitanje.odgovorID, Odgovor: pitanje.Odgovor, Tacan: pitanje.tacan[0] == 1 ? true: false})
        }

    }
    const test: testIspit = {
        Pitanja: result,
        Ispit: id,
        Date: new Date(),
        Ispitanik: "test"
    }
    return test;
}
export default async function Page({params}:{params:Promise<{id:number}>})
{
    const {id} = await params;
    const pitanja = await getData(id) as unknown as Tema;
    console.log(pitanja);
    return (
        <section className={`p-8`}>
            <Test test={pitanja}></Test>
        </section>
    )
}