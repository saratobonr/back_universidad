
const pg = require('pg');


class PostgresService{
    constructor(){
        this.connectionString = "postgresql://postgres:1234@localhost:5432/universidad"; 
        this.pool = new pg.Pool(
            {connectionString:this.connectionString}
        );
        
    }

    async ejecutarSql(sql){
        let result = await this.pool.query(sql);
        return result;
    }

    async ejecutarSql2 (sql, datos){
        let result = await this.pool.query(sql, datos);
        return result;
    }
}

module.exports = PostgresService;