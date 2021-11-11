const db = require('../config/dbConfig');

class DogDAO {

    async getDogs(){
        let results = await db.query(`SELECT * FROM dog`).
        catch(console.log);
        return results.rows;
    };

    async getOneDog(id){
        let result = await db.query('SELECT * FROM dog WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };

    async createDog(name, age){
        await db.query('INSERT INTO dog (name, age) VALUES ($1, $2)',[name, age])
        .catch(console.log);
        return;        
    };

    async updateDog(id, name, age){
        await db.query(`UPDATE dog SET name = $1, age = $2 WHERE id = $3`,[name, age,parseInt(id)])
        .catch(console.log);

        return;
    };

    async deleteDog(id){
        await db.query(`DELETE FROM dog WHERE id=$1`,[parseInt(id)])
        .catch(console.log);

        return;        
    };

};

module.exports = DogDAO;