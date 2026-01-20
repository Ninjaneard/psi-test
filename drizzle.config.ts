import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { getDatabaseCredentials } from './utils/config.js';


const configPromise =  () => {
    const db_url =  getDatabaseCredentials();
    return defineConfig({
        out: './drizzle',
        schema: './src/app/data/schema.ts',
        dialect: 'mysql',
        dbCredentials: {
            url: "mysql://psitest:N3c@1987!@psytest-mysql.mysql.database.azure.com:3306/auth",
        },
    })
}
console.log();
export default  configPromise() ;
