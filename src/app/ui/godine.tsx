import {Godina, Program} from "@/app/models";
import Link from "next/link";

export default async function  GodinaList({godine}: { godine: Array<Godina> }){

    return (
        <div>
            <ul>
                { godine.map((godina)=>(
                    <li key={godina.ID}><Link href={`godina/${godina.ID}`} >{godina.naziv}</Link></li>
                ))
                }
            </ul>
        </div>
    )
}