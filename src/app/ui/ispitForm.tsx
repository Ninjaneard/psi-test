"use client"
import {Godina} from "@/app/models";
import Link from "next/link";
import {useState} from "react";
import {generateIspit} from "@/app/data/ispiti";
import * as jspdf from "jspdf";
import jsPDF from "jspdf";
//import { writeFileSync } from "fs"

export default function  IspitForm({godina}: { godina: number }){
    let [pitanja, setPitanja] = useState(0);
    let [ispit, setIspit] = useState({
        ispit:'',
        kljuc:''
    });
    let doc = new jsPDF();
    let buttonClick = async function (pitanja, godina) {
        let text = await generateIspit(pitanja, godina);
        setIspit(text);

    }

    return (
        <div>
            <label>Broj pitanja po temi</label>
            <input onChange={e => setPitanja(parseInt(e.target.value))} type={`number`} name={`pitanja`}></input>
            <button onClick={e => buttonClick(pitanja,godina)}>generisi</button>
            <div><Link href={ispit.ispit}>Ispit</Link><Link href={ispit.kljuc}>Kljuc</Link></div>
        </div>

    )
}