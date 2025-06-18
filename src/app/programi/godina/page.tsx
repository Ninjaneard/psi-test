//import * as mysql from 'mysql2';
import * as mysql from 'mysql2/promise';
import {PoolOptions} from "mysql2";
import {Program} from "@/app/models";
import ProgramList from "@/app/ui/programs";

export default async function Page() {
    //let data = await getData() as Program[];
    //console.log(data);
    return( <div><h1>Pitanja</h1>
        <div>
            godina
        </div>   </div>
    );
}