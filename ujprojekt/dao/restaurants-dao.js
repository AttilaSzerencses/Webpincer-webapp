const db = require('../config/dbConfig');

class RestaurantDAO {

    async getRestaurants(){
        let results = await db.query(`SELECT * FROM RESTAURANTS`).
        catch(console.log);
        return results.rows;
    };

    async getOneRestaurant(id){
        let result = await db.query('SELECT * FROM RESTAURANTS WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };
	
	async getRestaurantByUID(id){
        let result = await db.query('SELECT * FROM RESTAURANTS WHERE u_id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };

    async createRestaurant(uid, opens, closes, cprice, restaurantpic){
        await db.query("INSERT INTO RESTAURANTS(u_id, opens, closes, cprice, restaurantpic) VALUES ($1,$2,$3,$4,$5)",[uid, opens, closes, cprice, restaurantpic])
        .catch(console.log);
        return;        
    };

    async updateRestaurant(id, opens, closes, cprice, restaurantpic){
        await db.query(`UPDATE RESTAURANTS SET opens = $1, closes= $2, cprice=$3, restaurantpic= $4  WHERE id = $5`,[opens, closes, parseInt(cprice), restaurantpic,parseInt(id)])
        .catch(console.log);

        return;
    };

    async deleteRestaurant(id){
        await db.query(`DELETE FROM RESTAURANTS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

	async deleteUIDRestaurant(id){
        await db.query(`DELETE FROM RESTAURANTS WHERE u_id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

	
};

module.exports = RestaurantDAO;