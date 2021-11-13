const db = require('../config/dbConfig');

class LocationDAO {

    async getLocations(){
        let results = await db.query(`SELECT * FROM LOCATIONS`)
		.catch(console.log);
        return results.rows;
    };

    async getOneLocation(id){
        let result = await db.query('SELECT * FROM LOCATIONS WHERE id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };
	
	async getLocationByUID(id){
        let result = await db.query('SELECT * FROM LOCATIONS WHERE u_id = $1',[id])
        .catch(console.log);
        return result.rows[0];
    };

    async createLocation(uid, postcode, city, street, streetnumber, other){
        await db.query("INSERT INTO LOCATIONS(u_id, postcode, city, street, streetnumber, other) VALUES ($1,$2,$3,$4,$5,$6)",[uid, parseInt(postcode), city, street, parseInt(streetnumber), other])
        .catch(console.log);
        return;        
    };

    async updateLocation(id, postcode, city, street, streetnumber, other){
        await db.query(`UPDATE LOCATIONS SET postcode = $1, city=$2, street=$3, streetnumber=$4, other=$5  WHERE id = $6`,[parseInt(postcode), city, street, parseInt(streetnumber), other ,parseInt(id)])
        .catch(console.log);

        return;
    };
	
	async updateLocationByUID(id, postcode, city, street, streetnumber, other){
        await db.query(`UPDATE LOCATIONS SET postcode = $1, city=$2, street=$3, streetnumber=$4, other=$5  WHERE u_id = $6`,[parseInt(postcode), city, street, parseInt(streetnumber), other ,parseInt(id)])
        .catch(console.log);

        return;
    };

    async deleteLocation(id){
        await db.query(`DELETE FROM LOCATIONS WHERE id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };
	
    async deleteUIDLocation(id){
        await db.query(`DELETE FROM LOCATIONS WHERE u_id=$1`,[parseInt(id)])
        .catch(console.log);
        return;        
    };

};

module.exports = LocationDAO;