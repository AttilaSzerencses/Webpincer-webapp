const db = require('../config/dbConfig');

class UserDAO {

    async getUsers(){
        let results = await db.query(`SELECT * FROM USERS`).
        catch(console.log);
        return results.rows;
    };

    async getOneUser(id){
        let result = await db.query('SELECT * FROM USERS WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };
	
	async getUsersByPermission(permission){
		let result = await db.query('SELECT * FROM USERS WHERE permission= $1',[permission])
        .catch(console.log);
        return result.rows;
	}

    async createUser(pw, email, name, phone){
        await db.query("INSERT INTO USERS(permission,password,email,name,phone) VALUES ('u',$1,$2,$3,$4)",[pw, email, name, phone])
        .catch(console.log);
        return;        
    };

    async updateUser(id, name, email, permission, phone){
        await db.query(`UPDATE USERS SET permission=$1, email=$2, name=$3, phone=$4 WHERE id = $5`,[ permission ,email, name ,phone, parseInt(id)])
        .catch(console.log);
        return;
    };
	async updateUserPassword(id, password){
        await db.query(`UPDATE USERS SET password=$1 WHERE id = $2`,[password,id])
        .catch(console.log);
        return;
    };

    async getUserByEmail(email){
        let result = await db.query('SELECT * FROM USERS WHERE email = $1',[email])
        .catch(console.log);
        return result;
    }

    async deleteUser(id){
        await db.query(`DELETE FROM USERS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

};

module.exports = UserDAO;