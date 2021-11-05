const express = require("express");
const router = express.Router();
const DAOfood = require('../DAOfood/food-DAOfood');
const DAOfoodorder = require('../DAOfood/order-DAOfood');


router.get("/", async (req, res) => {
    let foods = await new DAOfood().getFoods();
    return res.render('index',{ foods : foods });
  });
 
 
//INSERT INTO FOODS(u_id,foodname,price,foodpic)
router.post("/addfood", async (req, res) => {
	let {u_id} = req.body;
	let {foodname} = req.body;
	let {price} = req.body;
	let {foodpic} = req.body;
	await new DAOfood().createFood(u_id,foodname,price,foodpic);
	return res.redirect('/')
});
  
router.get("/editfood/:id", async (req, res) => {
    let id = req.params.id;
    let food = await new DAOfood().getOneFood(id);
    res.render("update-food", { model: food });
  });
  
router.post("/updatefood/:id", async (req, res) => {
    let id = req.params.id;
    let {u_id} = req.body;
	let {foodname} = req.body;
	let {price} = req.body;
	let {foodpic} = req.body;
    await new DAOfood().updateFood(id,u_id,foodname,price,foodpic);
    res.redirect("/");
});
  
router.post("/deletefood/:id", async (req, res) => {
    let id = req.params.id;
	await new DAOorder.deleteFIDOrder(id);
    await new DAOfood().deleteFood(id);
    res.redirect("/");
  });

module.exports = router;
