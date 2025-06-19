"use client"
import {Godina, IspitModel, Tema} from "@/app/models";
import Link from "next/link";
import {useState} from "react";
import {generateIspit} from "@/app/data/ispiti";
import * as jspdf from "jspdf";
import jsPDF from "jspdf";
//import { writeFileSync } from "fs"


export default function  IspitForm({teme}: { teme: Array<Tema> }){
    let [pitanja, setPitanja] = useState(new Array<IspitModel>());
    let [ispit, setIspit] = useState({
        ispit:'',
        kljuc:''
    });
    let doc = new jsPDF();
    let buttonClick = async function (pitanja) {
        console.log(pitanja);
        let text = await generateIspit(pitanja);
        setIspit(text);

    }

    let addNPitanja = function(tema, nPitanje)
    {
         let pitanjeTmp =  {tema:tema, nPitanja: nPitanje}
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
                               onChange={e => setPitanja(addNPitanja(e.target.name, e.target.value))}></input>
                    </div>

                ))
            }
            <button className={`bg-indigo-300 border-solid border-1`} onClick={e => buttonClick(pitanja)}>generisi</button>

            <div><Link className={`bg-indigo-300 border-solid border-1`} href={ispit.ispit}>Ispit</Link><Link className={`bg-indigo-300 border-solid border-2`} href={ispit.kljuc}>Kljuc</Link></div>

        </div>

    )
}