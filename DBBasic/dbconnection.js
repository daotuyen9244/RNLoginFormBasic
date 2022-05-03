const mssql = require('mssql');
class DBConnection {
    async getConnection() {
        try {
            return await mssql.connect({
                user: 'tuyendt',
                password: '12345',
                server: 'DESKTOP-SFDGTK8',
                database: 'Demo',
                options: {
                    trustServerCertificate: true
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = new DBConnection();
