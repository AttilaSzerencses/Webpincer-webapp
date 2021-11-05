const express = require("express");
const router = express.Router();
const DAOlocation = require('../DAOlocation/location-DAOlocation');


router.get("/", async (req, res) => {
    let locations = await new DAOlocation().getLocations();
	
	res.send("Hello World");
    return res.render('index',{ locations : locations });
  });
 
 
//INSERT INTO LOCATIONS(u_id,postcode,cityname,street,streetnumber,other) VALUES ('1','6700', 'Szeged', 'Csanadi', '17', '9.em 52-es ajto');
router.post("/addlocation", async (req, res) => {
	let {u_id} = req.body;
	let {postcode} = req.body;
	let {street} = req.body;
	let {streetnumber} = req.body;
	let {phone} = req.body;
	let {other} = req.body;
	await new DAOlocation().createLocation(u_id,postcode,cityname,street,streetnumber,other);
	return res.redirect('/')
});
  
router.get("/editlocation/:id", async (req, res) => {
    let id = req.params.id;
    let location = await new DAOlocation().getOneLocation(id);
    res.render("update-location", { model: location });
  });
  
router.post("/updatelocation/:id", async (req, res) => {
    let id = req.params.id;
    let {u_id} = req.body;
	let {postcode} = req.body;
	let {street} = req.body;
	let {streetnumber} = req.body;
	let {phone} = req.body;
	let {other} = req.body;
    await new DAOlocation().updateLocation(id,u_id,postcode,cityname,street,streetnumber,other);
    res.redirect("/");
});
  
router.post("/deletelocation/:id", async (req, res) => {
    let id = req.params.id;
    await  new DAOlocation().deleteLocation(id);
    res.redirect("/");
  });
  
 

module.exports = router;
