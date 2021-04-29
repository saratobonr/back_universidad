
const pg = require('pg');


class PostgresService{
    constructor(){
        this.connectionString = "postgresql://postgres:1234@localhost:5432/universidad"; 
        this.pool = new pg.Pool();
        
    }

    async ejecutarSql(sql){
        let result = await this.pool.query(sql);
        return result;
    }
}

module.exports = PostgresService;