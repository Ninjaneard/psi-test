//import * as mysql from 'mysql2';

import {SignIn} from "@/app/ui/sign-in.tsx";
import {auth} from "../../../auth.ts";
import StudentTestList from "@/app/ui/account/studentTestList.tsx";
import Link from "next/link";

export default async function Page() {
    //let data = await getData() as Program[];
    //console.log(data);
    const user = await auth()

    if(user && user.user != null && user.user.email != null && user.user.role != "Admin") return <div><StudentTestList email={user.user.email}/></div>;
    else if(user && user.user != null && user.user.email != null && user.user.role == "Admin") return <div><h1>Admin</h1><Link href={`/programi`}>Programi</Link></div>;
    else
    return( <div><h1>Account</h1>
        <div>
            <SignIn></SignIn>
        </div>   </div>
    );
}