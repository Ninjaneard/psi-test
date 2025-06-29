
import {addQuestion} from "@/app/data/ispiti";

export default async function  QuestionForm({temaID}: { temaID: number }){

    return (
        <div>
            <form action={addQuestion}>
                <label className={`block shadow-2xs border-gray-300 border-solid border-4`}>Pitanje</label>
                <textarea className={`block shadow-2xs border-gray-300 border-solid border-4`} name={`pitanje`}></textarea>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} name={`tema`} value={temaID} type={`hidden`}/>
                <label className={`block shadow-2xs border-gray-300 border-solid border-4`}>Izbor</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`Izbor`}/>
                <label className={`block shadow-2xs border-gray-300 border-solid border-4`}>Opisno</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`Opisno`}/>
                <label className={`block shadow-2xs border-gray-300 border-solid border-4`}>Odgovor</label>
                <textarea className={`block shadow-2xs border-gray-300 border-solid border-4`} name={`odgovor`}></textarea>

                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[1]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[1]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[2]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[2]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[3]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[3]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[4]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[4]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[5]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[5]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[6]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[6]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[7]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[7]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[8]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[8]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[9]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[9]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[10]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[10]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[11]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[11]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[12]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[12]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[13]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[13]`}/>
                <label>Odgovori</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`text`} name={`odgovori[14]`}/>
                <label>Tacan</label>
                <input className={`block shadow-2xs border-gray-300 border-solid border-4`} type={`checkbox`} name={`tacan[14]`}/>
                <button className={`bg-indigo-300 border-solid border-4`} type={`submit`}> Add</button>
            </form>
        </div>
    )
}