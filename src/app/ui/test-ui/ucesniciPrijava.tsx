'use client'

import {useState} from "react";
import {dodajUcesnike} from "@/app/data/ispiti.ts";

export default function UcesniciPrijava ({ispitID}: {ispitID:number}){
    const [ucesnici, setUcesnici] = useState<string[]>([]);
    return (
        <div>
            <textarea className={`border-2 border-gray-300 rounded-md p-2`} onChange={(e)=>setUcesnici(e.target.value.split(','))} id={`listaLjudi`}>

            </textarea>
            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `} onClick={()=>dodajUcesnike(ucesnici, ispitID)}>Prijavi</button>
        </div>
    )
}