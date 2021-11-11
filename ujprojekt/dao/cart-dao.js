const db = require('../config/dbConfig');

class CartDAO {

    async getCarts(){
        let results = await db.query(`SELECT * FROM CARTS`).
        catch(console.log);
        return results.rows;
    };

    async getOneCart(u_id){
        let result = await db.query('SELECT * FROM CARTS WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };

    async addFoodToCart(uid,fid,name,price){
        await db.query("INSERT INTO CARTS(uid,fid,name,price) VALUES ($1,$2,$3,$4)",[uid,fid,name,price])
        .catch(console.log);
        return;        
    };

    async deleteAllFoodFromCart(u_id){
        await db.query(`DELETE FROM CARTS WHERE id=$1`,[parseInt(u_id)])
        .catch(console.log);
        return;        
    };
	async deleteFoodFromCart(u_id,fid){
        await db.query(`DELETE FROM CARTS WHERE id=$1, fid=$2`,[parseInt(id),fid])
        .catch(console.log);
        return;        
    };
//uid,fid,name,price.

	async getOrderFromCart(u_id){
        let result = await db.query('SELECT * FROM CARTS WHERE u_id = $1',[u_id])
        .catch(console.log);
        return result;
    };
	
	async deleteUIDCart(id){
        await db.query(`DELETE FROM CARTS WHERE u_id=$1`,[parseInt(id)])
        .catch(console.log);
        return;
    };
	
	async deleteFIDCart(id){
        await db.query(`DELETE FROM CARTS WHERE fid=$1`,[parseInt(id)])
        .catch(console.log);
        return;
    };
};

module.exports = CartDAO;