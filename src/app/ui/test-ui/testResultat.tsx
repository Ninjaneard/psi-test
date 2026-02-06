'use client'
import { testPitanjePoeni, testResult} from "@/app/models";
import {useState} from "react";
import TestResultPitanje from "@/app/ui/test-ui/testResultPitanje.tsx";
import {oceniIspit} from "@/app/data/ispiti.ts";





export default function  TestResult({testovi}: { testovi: testResult}){

    const [poeni, setPoeni] = useState<testPitanjePoeni[]>([]);


    const handlePoeniChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.id);

        console.log(poeni.find((p)=>p.pitanjeID===parseInt(e.target.id)));
        if(poeni.find((p)=>p.pitanjeID===parseInt(e.target.id))==undefined)
        {
            const tmpPoeni = [...poeni];
            console.log('postojeci');
            console.log(tmpPoeni);
            tmpPoeni.push({pitanjeID: parseInt(e.target.id), poeni: parseFloat(e.target.value)});
            console.log(tmpPoeni);
            setPoeni(tmpPoeni);
            console.log(poeni);
        }
        else
        {
            const tmpPoeni = [...poeni];
            console.log('ne postojeci');
            console.log(tmpPoeni);
            tmpPoeni[tmpPoeni.findIndex((p) => p.pitanjeID == parseInt(e.target.id))] = {pitanjeID: parseInt(e.target.id), poeni: parseFloat(e.target.value)};
            console.log(tmpPoeni);
            setPoeni(tmpPoeni);
            console.log(poeni);
        }
        console.log(poeni);
    }
    console.log(handlePoeniChange);
    const getPoeni = (id:number): number =>{
        const resPoeni = poeni.find((p)=>p.pitanjeID===id)?.poeni;
        if(resPoeni!=undefined) return resPoeni;
        else return 0;
      //  return  poeni.find((p)=>p.pitanjeID===id)?.poeni && poeni.find((p)=>p.pitanjeID===id)?.poeni != undefined ? poeni.find((p)=>p.pitanjeID===id)?.poeni : 0;
    }


    return (
        <section className={`p-8`}>
            {
                testovi.pitanja.map((pitanje) => (


                    <TestResultPitanje  key={pitanje.PitanjeID} pitanje={pitanje} handlePoeniChange={handlePoeniChange} getPoeni={getPoeni}></TestResultPitanje>
                ))
            }
            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3`} onClick={() => {oceniIspit(poeni).then((ress) => console.log(ress))}} >Oceni</button>
        </section>
    )
}