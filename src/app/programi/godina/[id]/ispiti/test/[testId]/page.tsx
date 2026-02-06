
import {testOdgovor,  testResult, testResultPitanja} from "@/app/models";

import dbPool from "@/app/lib/myslq";

import TestResult from "@/app/ui/test-ui/testResultat.tsx";
import {auth} from "../../../../../../../../auth.ts";

async function getData(id:number){
    const conn = dbPool;
    const [list] = await conn.query(`Select o.id as profilOdgovor, ip.ID as test, ip.korisnik as korisnik, o2.id as odgovorID, p.ID as pitanjeID, p2.Pitanje as pitanje, p2.izbor as izbor, o.odgovor as odgovor, p2.opisno as opisno, p2.Odgovor as odgovoorKljuc, o2.Odgovor as Odgovori, tacan as kljuc from ispiti.ispit_profil ip left join ispiti.ispit i on ip.ispit = i.ID left join ispiti.ispit_pitanja p on i.ID = p.ispit left join ispiti.ispit_odgovor o on p.ID = o.pitanje left join ispiti.pitanja p2 on p.pitanje = p2.ID left join ispiti.odgovori o2 on p2.ID = o2.pitanje WHERE ip.ID = ${id}`) as any[];
    const resultat:testResult = {
        pitanja : [],
        ispit : id,
        korisnik : "",
        rezultat : 0
    };
   // console.log(list);
    for(let row of list){

        const test = resultat.pitanja.findIndex(function (item) {
          //  console.log(item.TestPitanjeID == row.pitanjeID);

            return item.TestPitanjeID == row.pitanjeID;
        });
   //     console.log( row.pitanjeID, test);
        if(test == -1)
        {
    //        console.log("odgovor:",row.odgovor);
            const pitanje:testResultPitanja = {
                TestPitanjeID: row.pitanjeID,
                Pitanje: row.pitanje,
                PitanjeID: row.pitanjeID,
                ProfilOdgovorID: row.profilOdgovor,
                Odgovori: {
                    odgovori: row.odgovor,
                    odgovor: row.Odgovori,
                    odgovorKljuc: row.odgovoorKljuc,
                    kljuc:[],
                    rezultat:0
                },
                Opisno: row.opisno[0] == 1 ? true: false,
                Izbor: row.izbor[0] == 1 ? true: false,
            };
            const kljucTmp:testOdgovor = {
                odgovorID: row.odgovorID,
                Odgovor: row.Odgovori,
                Tacan: row.kljuc != null && row.kljuc[0] == 1 ,
            }
          //  console.log(kljucTmp);
            pitanje.Odgovori.kljuc.push(kljucTmp);
            resultat.pitanja.push(pitanje);
        }
        else{
            const kljucTmp:testOdgovor = {
                odgovorID: row.odgovorID,
                Odgovor: row.Odgovori,
                Tacan: row.kljuc != null && row.kljuc[0] == 1,
            }
         //   console.log(kljucTmp);
            if(resultat.pitanja[test].Odgovori.kljuc.find(x => x.odgovorID == kljucTmp.odgovorID) == undefined)
             resultat.pitanja[test].Odgovori.kljuc.push(kljucTmp);
            //resultat.pitanja[test].Odgovori.kljuc.push(kljucTmp);
        }
        resultat.korisnik = row.korisnik;

    }
    return resultat;
}
export default async function Page({params}:{params:Promise<{testId:number}>})
{

    const {testId} = await params;
    console.log("no404",testId);
    const testovi = await getData(testId)  as testResult;
    const user = await auth()
    if(user && user.user != null && user.user.role == "Admin")
        return (
            <section className={`p-8`}>
                <TestResult testovi={testovi} ></TestResult>
            </section>
        )
    else return (<div>404</div>);
}