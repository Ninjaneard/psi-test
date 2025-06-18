'use server'
import {PoolOptions} from "mysql2";
import * as mysql from "mysql2/promise";
import {Query} from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import {Odgovor, PitanjeFront, Tema} from "@/app/models";
import {writeFileSync} from "node:fs";
const { jsPDF } = require("jspdf");

export async function addQuestion(formData:FormData)
{
    var pitanje = formData.get('pitanje');
    var izbori = formData.get('Izbor')=='on'?true:false;
    var tema = formData.get('tema')
    var opis = formData.get('Opisno')=='on'?true:false;
    var odgovor = formData.get('odgovor');
    const access: PoolOptions = {
        user: 'root',
        database: 'ispiti',
        password: 'nov1987'
    };
    const conn = mysql.createPool(access);
    var result = await  conn.execute(`INSERT INTO pitanja (Pitanje, izbor, opisno, Odgovor, Tema) VALUES ('${pitanje}',${izbori},${opis},'${odgovor}',${tema} )`)
 //   console.log(result[0].insertId);
    var poitanjeId = result[0].insertId;
    if(poitanjeId > 0 && izbori)
    {
        for(var i = 1; i<15 ; i++)
        {
            var odgovori = formData.get(`odgovori[${i}]`);
            var tacni = formData.get(`tacan[${i}]`)=='on'?true:false;
           // console.log(i, odgovori, tacni);
            if(odgovori != '')
            {
                var query = `INSERT INTO odgovori (Odgovor, tacan, pitanje) VALUES ('${odgovori}', ${tacni}, ${poitanjeId})`
                var result2 = await conn.execute(query);
               // console.log(i, result2[0].insertId)
            }
        }
    }
}

export async function generateIspit(pitanjaN:number, godina:number){
    const access: PoolOptions = {
        user: 'root',
        database: 'ispiti',
        password: 'nov1987'
    };
    const conn = mysql.createPool(access);
    let query = `SELECT ID FROM tema WHERE godina=${godina}`;
    let result = await conn.query(query);
    let teme = result[0] as Array<Tema>;
    let pitanja : Array<PitanjeFront> = new Array<PitanjeFront>();
    for(let tema of teme){
        let query2 = `SELECT * FROM pitanja WHERE Tema=${tema.ID}`;
        let result2 = await conn.query(query2);

        let pitanja2 = result2[0] as Array<PitanjeFront>;
        let pitanjaTmp = new Array<PitanjeFront>()
        if(pitanja2.length > 0)
        {
            let pitanjaR = Array.from({length: pitanjaN }, () => Math.floor(Math.random() * (pitanja2.length)));
            console.log(pitanjaR, pitanja2);
            for( let pitanjars of pitanjaR)
            {
                pitanjaTmp.push(pitanja2[pitanjars])
            }
        }

        for(let pitanje of pitanjaTmp){
            let query3 = `SELECT * FROM odgovori WHERE Pitanje=${pitanje.ID}`;
            let result3 = await conn.query(query3);
            let odgovor = result3[0] as Array<Odgovor>;
            let odgovori :Array<Odgovor> = new Array<Odgovor>();

            pitanje.Odgovori=odgovor;
           // console.log(pitanja);
        }
        console.log(pitanjaTmp);
        pitanja = pitanja.concat(pitanjaTmp);
       // console.log(pitanja);
    }
    console.log(pitanja);
    const doc = new jsPDF();
    let count = 1;
    let file = Array();
    let fileK = '';
    for(let pitanje of pitanja)
    {
        var pitanjeTxt = `${count}) ${pitanje.Pitanje} \n`;

        //doc.text(pitanjeTxt, 1, 1);
        file.push(pitanjeTxt)
        fileK += pitanjeTxt;
        if(pitanje.izbor){
            let ansCount = 1;
            let odgovoriTxt = '';
            for(let odg of pitanje.Odgovori){
                file.push(`\t ${ansCount}. ${odg.Odgovor} \n`) ;
                fileK += `\t ${ansCount}. ${odg.Odgovor} `;
                if(odg.tacan)
                    fileK += '*';
                fileK += '\n';
                ansCount ++;
            }
            //doc.text(odgovoriTxt, 10, 10);
            file.push('\n')
        }
        if(pitanje.opisno){
           // doc.text('/n/n/n/n/n',1,1);
            file.push('Odgovor:\n');
            file.push('\n');
            file.push('\n');
            file.push('\n');
            fileK += `Odgovor: ${pitanje.Odgovor} \n`
        }
        count ++;
    }
    let queryt = `SELECT godina.naziv as god, p.naziv as naziv FROM GODINA  RIGHT JOIN ispiti.program p on p.ID = GODINA.program WHERE GODINA.ID=${godina}`;
    let rest = await conn.query(queryt);
    console.log(rest);
    let date = new Date().toDateString();
    let naziv = rest[0][0].naziv;
    let god = rest[0][0].god;
   // doc.save('../ispit_test.pdf');
    var resp = {
        ispit:'',
        kljuc:''
    };
    resp.ispit = `/ispit_${naziv}_${god}${date}.docx`;
    resp.kljuc = `/ispit_${naziv}_${god}${date}_kljuc.docx`;
    writeFileSync("public"+resp.ispit,file.join('\n'), {
             flag: "w"
         });
    writeFileSync("public"+resp.kljuc,fileK, {
        flag: "w"
    });
    return resp;
}