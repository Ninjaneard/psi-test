import {Program} from "@/app/models";
import Link from "next/link";
import dbPool from "@/app/lib/myslq";

export default async function  IspitList({ispiti }:{ispiti : Array<any> }) {

    // console.log(data);
    return (
        <div>
            <ul>
                { ispiti.map((ispit)=>(
                    <li key={ispit.ID}><Link href={`ispiti/${ispit.ID}`} >{ispit.datum.toString()}</Link></li>
                ))
                }
            </ul>
        </div>
    )
}