'use client'
import { testResultPitanja, testPitanjePoeni} from "@/app/models";
import {useState} from "react";





export default function  TestResultPitanje({pitanje, handlePoeniChange, getPoeni}: { pitanje: testResultPitanja, handlePoeniChange: (e: React.ChangeEvent<HTMLInputElement>) => void, getPoeni: (id: number) => number }){
    // console.log(handlePoeniChange);
    // console.log(getPoeni);

    return (
        <div className={`border-b-4 border-indigo-500`} key={pitanje.TestPitanjeID}>
            <h2>{pitanje.Pitanje}</h2>

            <div className={'odgovori'}>
                <ul>
                {

                    pitanje.Izbor &&

                        pitanje.Odgovori.kljuc.map((odgovor) => (
                            //console.log(odgovor.Tacan),
                            odgovor != null &&
                                <li className={`border-b-1 border-gray-300`} key={odgovor.odgovorID}>
                                    {odgovor.Odgovor}
                                    {
                                        odgovor.Tacan ? <span className={'tacan'}>&#9989; {odgovor.Tacan}</span> : null
                                    }

                                    {
                                        // @ts-ignore
                                        pitanje.Odgovori.odgovori != null? pitanje.Odgovori.odgovori.odgovori.find((o) => o!=null?o.odgovorID === odgovor.odgovorID.toString():false)?.odgovor && <span className={'odgovor'} >&#10003;</span>: null
                                    }
                                </li>
                        ))
                }
                </ul>
                    {

                        pitanje.Opisno?
                        <div>
                            <div>
                                <h3>Odgovor</h3>
                                <p className={'opisno border-2 border-gray-300 rounded-md p-2'}>{
                                    // @ts-ignore
                                    pitanje.Odgovori.odgovori.opisno
                                }</p>
                            </div>
                            <div>
                                <h3>Resenje</h3>
                                <p className={'opisno border-2 border-gray-300 rounded-md p-2 italic'}>{pitanje.Odgovori.odgovorKljuc}</p>
                            </div>
                        </div>: null

                    }
                    {
                        pitanje.ProfilOdgovorID != null ? <input className={`border-2 border-gray-300 rounded-md p-2`} id={pitanje.ProfilOdgovorID.toString()} type={'number'} name={'result'} value={getPoeni(pitanje.ProfilOdgovorID)} onChange={handlePoeniChange} />
                            : <span className={'tacan'}>Neodgovoreno</span>
                    }
            </div>

        </div>
    )
}