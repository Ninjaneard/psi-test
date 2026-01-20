"use client"
import { IspitModel, Tema} from "@/app/models";
import Link from "next/link";
import {useState} from "react";
import {generateIspit} from "@/app/data/ispiti";

//import { writeFileSync } from "fs"


export default function  IspitForm({teme, godina}: { teme: Array<Tema>, godina: number }){
    const [pitanja, setPitanja] = useState(new Array<IspitModel>());
    const [ispit, setIspit] = useState({
        ispit:'',
        kljuc:''
    });

    const buttonClick = async function (pitanja:IspitModel[], godina:number) {
       // console.log(pitanja);
        const text = await generateIspit(pitanja, godina);
        setIspit(text);

    }

    const addNPitanja = function(tema:number, nPitanje:number)
    {
         const pitanjeTmp:IspitModel =  {tema:tema, nPitanja: nPitanje}
         pitanja[tema]= pitanjeTmp;
         return pitanja;
    }

    return (
        <div>
            <label>Broj pitanja po temi</label>

            {
                teme.map((tema) =>(
                    <div key={tema.ID}>
                        <label>{tema.naziv}:</label>
                        <input className={`border-gray-300 border-solid border-1`} type={`number`} name={tema.ID.toString()}
                               onChange={e => setPitanja(addNPitanja(parseInt(e.target.name), parseInt(e.target.value)))}></input>
                    </div>

                ))
            }
            <button className={`bg-indigo-300 border-solid border-1`} onClick={() => buttonClick(pitanja, godina)}>generisi</button>

            <div><Link className={`bg-indigo-300 border-solid border-1`} href={ispit.ispit}>Ispit</Link><Link className={`bg-indigo-300 border-solid border-2`} href={ispit.kljuc}>Kljuc</Link></div>

        </div>

    )
}