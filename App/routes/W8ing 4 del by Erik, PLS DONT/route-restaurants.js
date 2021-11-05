const express = require("express");
const router = express.Router();
const DAOrestaurant = require('../DAOrestaurant/restaurant-DAOrestaurant');


router.get("/", async (req, res) => {
    let restaurants = await new DAOrestaurant().getRestaurants();
    return res.render('index',{ restaurants : restaurants });
  });
 
 
//INSERT INTO RESTAURANTS(u_id,opens,closes,cprice,restaurantpic) VALUES
router.post("/addrestaurant", async (req, res) => {
	let {u_id} = req.body;
	let {opens} = req.body;
	let {closes} = req.body;
	let {cprice} = req.body;
	let {restaurantpic} = req.body;
	await new DAOrestaurant().createRestaurant(u_id,opens,closes,cprice,restaurantpic);
	return res.redirect('/')
});
  
router.get("/editrestaurant/:id", async (req, res) => {
    let id = req.params.id;
    let restaurant = await new DAOrestaurant().getOneRestaurant(id);
    res.render("update-restaurant", { model: restaurant });
  });
  
router.post("/updaterestaurant/:id", async (req, res) => {
    let id = req.params.id;
    let {u_id} = req.body;
	let {opens} = req.body;
	let {closes} = req.body;
	let {cprice} = req.body;
	let {restaurantpic} = req.body;
    await new DAOrestaurant().updateRestaurant(id,u_id,opens,closes,cprice,restaurantpic);
    res.redirect("/");
});
  
router.post("/deleterestaurant/:id", async (req, res) => {
    let id = req.params.id;
    await  new DAOrestaurant().deleteRestaurant(id);
    res.redirect("/");
  });

module.exports = router;
