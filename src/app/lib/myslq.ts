
import * as mysql from "mysql2/promise";
import {Pool} from "mysql2/promise";

declare global {
    const _mySQLPool : Pool;
}
export interface IDBSettings {
    host: string

    port: number

    user: string

    password: string

    database: string
}

export const GetDBSettings = (): IDBSettings => {
    const env = process.env.NODE_ENV

    if (env == 'development')
        return {
            host: process.env.host_dev!, //'58.84.143.251',

            port: parseInt(process.env.port_dev!),

            user: process.env.user_dev!,

            password: process.env.password_dev!,

            database: process.env.database_dev!,
        }
    else
        return {
            host: process.env.host!, //'58.84.143.251',

            port: parseInt(process.env.port!),

            user: process.env.user!,

            password: process.env.password!,

            database: process.env.database!,
        }
}



class Singleton {
    private static _instance: Singleton;
    private pool: Pool;
    private constructor() {
        console.log(process.env.NODE_ENV, GetDBSettings());
        this.pool = mysql.createPool(GetDBSettings());
       // this.clientPromise = this.client.connect();
        if (process.env.NODE_ENV === 'development') {
            // In development mode, use a global variable so that the value
            // is preserved across module reloads caused by HMR (Hot Module Replacement).
            //global._mySQLPool = this.pool;
        }
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new Singleton();
        }
        return this._instance.pool;
    }
}
const dbPool = Singleton.instance;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default dbPool;