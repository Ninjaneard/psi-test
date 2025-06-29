'use server'
import { ResultSetHeader, RowDataPacket} from "mysql2";


import {IspitModel, Odgovor, PitanjeFront} from "@/app/models";
import {writeFileSync} from "node:fs";
import dbPool from "@/app/lib/myslq";


export async function addQuestion(formData:FormData)
{
    const pitanje = formData.get('pitanje');
    const izbori = formData.get('Izbor')=='on'?true:false;
    const tema = formData.get('tema')
    const opis = formData.get('Opisno')=='on'?true:false;
    const odgovor = formData.get('odgovor');
    const conn = dbPool;
    const result = await  conn.execute<ResultSetHeader>(`INSERT INTO pitanja (Pitanje, izbor, opisno, Odgovor, Tema) VALUES ('${pitanje}',${izbori},${opis},'${odgovor}',${tema} )`)
 //   console.log(result[0].insertId);
    const poitanjeId = result[0].insertId;
    if(poitanjeId > 0 && izbori)
    {
        for(let i = 1; i<15 ; i++)
        {
            const odgovori = formData.get(`odgovori[${i}]`);
            const tacni = formData.get(`tacan[${i}]`)=='on'?true:false;
           // console.log(i, odgovori, tacni);
            if(odgovori != '')
            {
                const query = `INSERT INTO odgovori (Odgovor, tacan, pitanje) VALUES ('${odgovori}', ${tacni}, ${poitanjeId})`
                const result2 = await conn.execute(query);
                console.log(i, result2)
            }
        }
    }
}
function pickRandomElements(arr:Array<PitanjeFront>, n:number) {
    // Create a shallow copy of the array to avoid modifying the original
    const shuffled = [...arr];
    let currentIndex = shuffled.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [shuffled[currentIndex], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[currentIndex],
        ];
    }

    // Return the first n elements of the shuffled array
    return shuffled.slice(0, n);
}

export async function generateIspit(ispitTemplate: Array<IspitModel>){
    const conn = dbPool;
    const file = [];
    let fileK = '';
    let pitanja : PitanjeFront[] = new Array<PitanjeFront>();
    console.log(ispitTemplate);
    let queryt = '';
    for(const tema of ispitTemplate){
        let pitanja2 = new Array<PitanjeFront>();
        let pitanjaTmp = new Array<PitanjeFront>()
        if(tema != undefined)
        {
            const query2 = `SELECT * FROM pitanja WHERE Tema=${tema.tema}`;
            const result2 = await conn.query(query2);
            pitanja2 = result2[0] as Array<PitanjeFront>;
            console.log(pitanja2);
            if(pitanja2.length > 0)
            {
                // let pitanjaR = Array.from({length: tema.nPitanja }, () => Math.floor(Math.random() * (pitanja2.length)));
                // //console.log(pitanjaR, pitanja2);
                // for( let pitanjars of pitanjaR)
                // {
                //     pitanjaTmp.push(pitanja2[pitanjars])
                // }
                const randPitanja = pickRandomElements(pitanja2, tema.nPitanja);
                console.log(randPitanja);
                pitanjaTmp = randPitanja;
            }
            console.log(tema ,pitanjaTmp.length);
            for(const pitanje of pitanjaTmp){
                const query3 = `SELECT * FROM odgovori WHERE Pitanje=${pitanje.ID}`;
                const result3 = await conn.query(query3);
                const odgovor = result3[0] as Array<Odgovor>;


                pitanje.Odgovori=odgovor;
                // console.log(pitanja);
            }
            //console.log(pitanjaTmp);
            pitanja = pitanja.concat(pitanjaTmp);
            // console.log(pitanja);
            //console.log(pitanja);
            queryt = `SELECT godina.naziv as god, p.naziv as naziv FROM GODINA  RIGHT JOIN ispiti.program p on p.ID = GODINA.program Left Join ispiti.tema t on GODINA.ID = t.Godina WHERE t.ID=${tema.tema}`;

        }


    }
    let count = 1;

    for(const pitanje of pitanja)
    {
        const pitanjeTxt = `${count}) ${pitanje.Pitanje} \n`;

        //doc.text(pitanjeTxt, 1, 1);
        file.push(pitanjeTxt)
        fileK += pitanjeTxt;
        if(pitanje.izbor){
            let ansCount = 1;

            for(const odg of pitanje.Odgovori){
                if(odg.tacan[0])
                    fileK += '[+]';
                file.push(`\t ${ansCount}. ${odg.Odgovor} \n`) ;
                fileK += `\t ${ansCount}. ${odg.Odgovor} `;
               // console.log(odg.tacan[0]);

                fileK += '\n';
                ansCount ++;
            }
            //doc.text(odgovoriTxt, 10, 10);
            file.push('\n')
        }
        if(pitanje.opisno[0]){
            // doc.text('/n/n/n/n/n',1,1);
            file.push('Odgovor:\n');
            file.push('\n');
            file.push('\n');
            file.push('\n');
            fileK += `Odgovor: ${pitanje.Odgovor} \n`
        }
        count ++;
    }
    const rest = await conn.query<RowDataPacket[]>(queryt);
    //console.log(rest);
    const date = new Date().toDateString();
    const naziv = rest[0][0].naziv;
    const god = rest[0][0].god;
   // doc.save('../ispit_test.pdf');
    const resp = {
        ispit:'',
        kljuc:''
    };
    console.log(file);
    resp.ispit = `/ispit_${naziv}_${god}${date}.docx`;
    resp.kljuc = `/ispit_${naziv}_${god}${date}_kljuc.docx`;
    writeFileSync("public"+resp.ispit,file.join(''), {
             flag: "w"
         });
    writeFileSync("public"+resp.kljuc,fileK, {
        flag: "w"
    });
    return resp;
}