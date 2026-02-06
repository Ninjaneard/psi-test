'use client'
import {testIspit, testOdgovorSubmited, testPitanje} from "@/app/models";
import { useState, useRef, useEffect } from "react";
import {submitAnswers} from "@/app/data/ispiti.ts";


export default function  Test({test}: { test: testIspit}){
    const pitanja: testPitanje[] = test.Pitanja;
    const [pitanje, setPitanje] = useState(null as testPitanje | null);
    const [odgovori, setOdgovori] = useState<testOdgovorSubmited[]>([]);
    const [odgovorI, setOdgovorI] = useState([]);
    const [odgovorO, setOdgovorO] = useState("");
    const [timers, setTimers] = useState(180);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [message, setMessage] = useState("Dobro dosli na test. Svako pitanje ima ograniceno vreme, ne mozete se vratiti na pitanje posto je submitovano. Takodje ako napustite stranicu ili neodgovorite na pitanje u vremenskom okviru, test ce biti automatski submitovan! Za pocetak testa pretisnite dugme Start. Srecno! ");
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [isPanalised, setIsPanelised] = useState<boolean>(false);
    const [buttonTxt, setButtonTxt] = useState("Start");

    useEffect(() => {
        const loseFocus = () => {
            setIsPanelised(true)
            setIsPaused(true);
            if(!isPanalised)
            {
                submit()
                setMessage("You lost focus!");
                console.log(
                    "You lost focus!"
                )
            }


        }

        const gainFocus = () => {
            setIsPanelised(false);
            setIsPaused(false);
            setMessage("Predhodno pitanje je završeno jer ste otisli sa stranice");




        }
        window.addEventListener('blur', loseFocus);
        window.addEventListener('focus', gainFocus);

        return () => {
            window.removeEventListener('blur', loseFocus);
            window.removeEventListener('focus', gainFocus);
        };
    }, []);

    useEffect(() => {

        if(isPanalised)
        {
            submit();
            setMessage("Predhodno pitanje je završeno jer ste otisli sa stranice");

        }
        else
        {


        }


    }, [isPanalised]);

    useEffect(()=>{

    //    console.log(intervalId);



            console.log(timers);
            if(!isPaused)
            {
                timerRef.current = setInterval(()=>{
                    console.log(timers);

                    setTimers((prevTime) => {
                        console.log(prevTime);
                        if (prevTime <= 1) {
                            clearInterval(timerRef.current);
                            submit();
                            return 0;
                        }
                        return prevTime - 1;
                    });
                    if(timers == 0 && pitanje != null)
                    {
                        submit();
                    }
                }, 1000);
            }

            return () => {

                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
    })



    const  submit = async () => {
        const nextQ =pitanja.pop();
       // console.log(odgovorI);
        if(nextQ == null)
        {

            setIsPaused(true);
            const res = await submitAnswers(odgovori, test.Ispitanik);
            console.log(odgovori);
            console.log(res);
            if(res.success == false) {
                console.log(
                    "Greska pri slanju rezultata"
                )
                console.log(res);
                setMessage("Doslo je do greske probajte ponovo!")
            }
            else {
                console.log(
                    "Rezultati su poslati"
                )
                setMessage("Ispit je zavrsen, rezultate ce da dobijete u narednim danima. Hvala!")
                setPitanje(null);
            }

        }
        else
        {
            const odgovorS:testOdgovorSubmited = {
                pitanjeID: pitanje?.TestPitanjeID,
                odgovor:{
                    odgovori:odgovorI,
                    opisno: odgovorO
                }
            };
            odgovorS.pitanjeID = pitanje?.TestPitanjeID;
            odgovorS.odgovor["odgovori"] = odgovorI;
            odgovorS.odgovor["opisno"] = odgovorO;
            setOdgovori([...odgovori, odgovorS])
            setOdgovorI([]);
            setOdgovorO("");
            setPitanje(nextQ)
            setTimers(180);
            //  setIsPaused(false);
            if(buttonTxt == "Start" )
            {
                setButtonTxt("Next");
                setIsPaused(false);
            }
            setMessage("")
        }



        //console.log(odgovori);
    }

    return (
        <div key={pitanje?.TestPitanjeID.toString()}>
            <p>{timers} s</p>
            <p>{pitanje?.Pitanje}</p>


            {

               pitanje?.Izbor == true ?
                   <div key={pitanje.PitanjeID.toString()}>
                       {pitanje.Odgovori.map((odgovor) => (
                           <div key={odgovor.odgovorID}><label htmlFor={odgovor.odgovorID.toString()} >{odgovor.Odgovor}</label><input className={`border-2 border-gray-300 rounded-md p-2`} id={odgovor.odgovorID.toString()} name={odgovor.odgovorID.toString()} onChange={(e) => {
                               const tmpOdgovori = [...odgovorI];
                               const tmpOdgovor = {
                                   odgovorID: e.target.name,
                                   odgovor: e.target.checked
                               };
                               tmpOdgovori[e.target.name] = tmpOdgovor;
                               setOdgovorI(tmpOdgovori)
                               console.log(tmpOdgovori);
                               console.log(e.target.checked, e.target.value);
                           }} type="checkbox"/></div>
                       ))}
                   </div> : pitanje?.Izbor
            }
            {
                pitanje?.Opisno == true ?
                    <div>
                        <textarea className={`border-2 border-gray-300 rounded-md p-2`} onChange={(e) => setOdgovorO(e.target.value)} id={pitanje.PitanjeID.toString()}></textarea>
                    </div> : pitanje?.Opisno
            }
            {
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3`} onClick={submit}>{buttonTxt}</button>
            }
            <div className={`text-red-700`}>{message}</div>
        </div>

    )
}