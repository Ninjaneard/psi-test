//import * as mysql from 'mysql2';
import ProgramList from "@/app/ui/programs";
import {auth} from "../../../auth.ts";
import { redirect } from 'next/navigation'

export default async function Page() {
    //let data = await getData() as Program[];
    //console.log(data);
    const user = await auth()
    if(user && user.user != null && user.user.role == "Admin")
        return( <div><h1>Programi</h1>
            <div>
                <ProgramList></ProgramList>
            </div>   </div>
        );
    else {
        redirect('/account')
    }
}