const db = require('../config/dbConfig');

class UserDAO {

    async getUsers(){
        let results = await db.query(`SELECT * FROM USERS`).
        catch(console.log);
        console.log(results);
        return results.rows;
    };

    async getOneUser(id){
        let result = await db.query('SELECT * FROM USERS WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };

    async createUser(name, email, pw, phone){
        await db.query("INSERT INTO USERS(permission,password,email,name,phone) VALUES ('u',$1,$2,$3,$4)",[pw, email, name, phone])
        .catch(console.log);
        return;        
    };

    async updateUsers(id, name, email, pw, phone){
        await db.query(`UPDATE USERS SET password = $1, email=$2, name=$3, phone=$4 WHERE id = $5`,[ pw, email, name ,phone, parseInt(id)])
        .catch(console.log);
        return;
    };

    async getUserByEmail(email){
        let result = await db.query('SELECT * FROM USERS WHERE email = $1'[email])
        .catch(console.log);
        return result;
    }

    async deleteUser(id){
        await db.query(`DELETE FROM USERS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

    async loginUser(email,password) {
      let results = await db.query('SELECT * FROM USERS WHERE email = $1, password = $2', [email, password])
          .catch(console.log);
      if (results.rowCount == 0){
          return null;
      } else{
          return results.rows[0];
      }
    };

};

module.exports = UserDAO;