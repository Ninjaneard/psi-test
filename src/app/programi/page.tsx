//import * as mysql from 'mysql2';
import ProgramList from "@/app/ui/programs";

export default async function Page() {
    //let data = await getData() as Program[];
    //console.log(data);
    return( <div><h1>Pitanja</h1>
        <div>
            <ProgramList></ProgramList>
        </div>   </div>
    );
}