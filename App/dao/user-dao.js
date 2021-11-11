const db = require('../config/db');

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

    async createUser(username, pw, email, name ,phone, cardnumber){
        await db.query("INSERT INTO USERS(permission,username,password,email,name,phone,cardnumber) VALUES ('u',$1,$2,$3,$4,$5,$6)",[username, pw, email, name, phone, cardnumber])
        .catch(console.log);
        return;        
    };

    async updateUsers(id, username, pw, email, name ,phone, cardnumber){
        await db.query(`UPDATE USERS SET username = $1, password = $2, email=$3, name=$4, phone=$5, cardnumber=$6 WHERE id = $7`,[username, pw, email, name ,phone, cardnumber,parseInt(id)])
        .catch(console.log);
        return;
    };

    async deleteUser(id){
        await db.query(`DELETE FROM USERS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };
	
	async getUserByEmail(email){
		let result = await db.query('SELECT * FROM USERS WHERE email = $1',[email])
        .catch(console.log);
        return result;
	}

};

module.exports = UserDAO;