export function getDatabaseCredentials() {
    return "mysql://psitest:N3c@1987!@psytest-mysql.mysql.database.azure.com:3306/auth"
}

export const fetchDatabaseCredentials = function async () {
   // let url = new Promise();
    return new Promise((resolve, reject) => {
        resolve("mysql://psitest:N3c@1987!@psytest-mysql.mysql.database.azure.com:3306/auth")
    });
}