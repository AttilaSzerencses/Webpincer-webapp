const db = require('../config/db');

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

    async createRestaurant(uid, opens, closes, cprice, restaurantpic){
        await db.query("INSERT INTO RESTAURANTS(u_id, opens, closes, cprice, restaurantpic) VALUES ($1,$2,$3,$4,$5)",[uid, opens, closes, cprice, restaurantpic])
        .catch(console.log);
        return;        
    };

    async updateRestaurant(id, uid, opens, closes, cprice, restaurantpic){
        await db.query(`UPDATE RESTAURANTS SET u_id = $1, opens = $2, closes= $3, cprice=$4, restaurantpic= $5  WHERE id = $6`,[parseInt(uid), opens, closes, parseInt(cprice), restaurantpic,parseInt(id)])
        .catch(console.log);

        return;
    };

    async deleteRestaurant(id){
        await db.query(`DELETE FROM RESTAURANTS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

};

module.exports = RestaurantDAO;