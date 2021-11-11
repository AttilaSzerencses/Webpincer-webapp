const db = require('../config/dbConfig');

class OrderDAO {

    async getOrders(){
        let results = await db.query(`SELECT * FROM ORDERS`).
        catch(console.log);
        return results.rows;
    };

    async getOneOrder(id){
        let result = await db.query('SELECT * FROM ORDERS WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };

    async createOrder(uid, fid, ordertime, sumprice){
        await db.query("INSERT INTO ORDERS(u_id, fid, ordertime, sumprice) VALUES ($1,$2,$3,$4)",[parseInt(uid), parseInt(fid), parseInt(ordertime), parseInt(sumprice)])
        .catch(console.log);
        return;        
    };

    async updateOrder(id ,ordertime, sumprice){
        await db.query(`UPDATE ORDERS SET ordertime= $1, sumprice= $2 WHERE id = $3`,[parseInt(ordertime), parseInt(sumprice), parseInt(id)])
        .catch(console.log);

        return;
    };

    async deleteOrder(id){
        await db.query(`DELETE FROM ORDERS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;
    };
	
	async deleteUIDOrder(id){
        await db.query(`DELETE FROM ORDERS WHERE u_id=$1`,[parseInt(id)])
        .catch(console.log);
        return;
    };
	
	async deleteFIDOrder(id){
        await db.query(`DELETE FROM ORDERS WHERE fid=$1`,[parseInt(id)])
        .catch(console.log);
        return;
    };

};

module.exports = OrderDAO;