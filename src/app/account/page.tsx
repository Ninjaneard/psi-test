//import * as mysql from 'mysql2';

import {SignIn} from "@/app/ui/sign-in.tsx";

export default async function Page() {
    //let data = await getData() as Program[];
    //console.log(data);
    return( <div><h1>Pitanja</h1>
        <div>
            <SignIn></SignIn>
        </div>   </div>
    );
}