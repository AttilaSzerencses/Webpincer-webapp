const db = require('../config/db');

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

    async updateOrder(id ,uid, fid, ordertime, sumprice){
        await db.query(`UPDATE ORDERS SET u_id = $1, fid= $2, ordertime= $3, sumprice= $4 WHERE id = $5`,[parseInt(uid), parseInt(fid), parseInt(ordertime), parseInt(sumprice), parseInt(id)])
        .catch(console.log);

        return;
    };

    async deleteOrder(id){
        await db.query(`DELETE FROM ORDERS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

};

module.exports = OrderDAO;