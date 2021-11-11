const db = require('../config/dbConfig');

class FoodDAO {

    async getFoods(){
        let results = await db.query(`SELECT * FROM FOODS`).
        catch(console.log);
        return results.rows;
    };

    async getOneFood(id){
        let result = await db.query('SELECT * FROM FOODS WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };
	
	async getAllFoodFromRestaurant(id){
        let result = await db.query('SELECT * FROM FOODS WHERE u_id = $1',[id])
        .catch(console.log);
        return result.rows;
    };
	
    async createFood(uid, foodname, price, foodpic){
        await db.query("INSERT INTO FOODS(u_id, foodname, price, foodpic) VALUES ($1,$2,$3,$4)",[uid, foodname, price, foodpic])
        .catch(console.log);
        return;        
    };

    async updateFood(id ,foodname, price, foodpic){
        await db.query(`UPDATE FOODS SET foodname= $1, price= $2, foodpic= $3 WHERE id = $4`,[foodname, price, foodpic, parseInt(id)])
        .catch(console.log);

        return;
    };

    async deleteFood(id){
        await db.query(`DELETE FROM FOODS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

    async deleteUIDFood(id){
        await db.query(`DELETE FROM FOODS WHERE u_id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };


};

module.exports = FoodDAO;