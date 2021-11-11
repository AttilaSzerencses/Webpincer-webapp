const express = require("express");
const router = express.Router();
const passport = require('passport');
const DAOuser = require('../dao/user-dao');
const DAOrestaurant = require('../dao/restaurants-dao');
const DAOfood = require('../dao/food-dao');
const DAOlocation = require('../dao/location-dao');
const DAOorder = require('../dao/order-dao');
const temp= require('../index')

router.get("/", async (req, res) => {
    let users = await new DAOuser().getUsers();
	let locations = await new DAOlocation().getLocations();
	let restaurants = await new DAOrestaurant().getRestaurants();
	let orders = await new DAOorder().getOrders();
	let foods = await new DAOfood().getFoods();
	
    return res.render('index',
	{ 	users : users,
		locations : locations,
		restaurants : restaurants,
		orders : orders,
		foods : foods
	});
  });


//USER
  
router.post("/adduser", async (req, res) => {
	let {username} = req.body;
	let {password} = req.body;
	let {email} = req.body;
	let {name} = req.body;
	let {phone} = req.body;
	let {cardnumber} = req.body;
	await new DAOuser().createUser(username, password, email, name,phone,cardnumber);
	return res.redirect('/')
});
  
router.get("/edituser/:id", async (req, res) => {
    let id = req.params.id;
    let user = await new DAO().getOneUser(id);
    res.render("update-user", { model: user });
  });
  
router.post("/updateuser/:id", async (req, res) => {
    let id = req.params.id;
    let {permission} = req.body;
	let {username} = req.body;
	let {pw} = req.body;
	let {email} = req.body;
	let {name} = req.body;
	let {phone} = req.body;
	let {cardnumber} = req.body;
    await new DAOuser().updateUser(id, permission, username, pw, email, name,phone,cardnumber);
    res.redirect("/");
});
  
router.post("/deleteuser/:id", async (req, res) => {
    let id = req.params.id;
	
	await new DAOorder().deleteUIDOrder(id);
	await new DAOfood().deleteUIDFood(id);
    await new DAOlocation().deleteUIDLocation(id);
	await new DAOrestaurant().deleteUIDRestaurant(id);
    await new DAOuser().deleteUser(id);
    res.redirect("/");
  });

//LOCATION

router.post("/addlocation", async (req, res) => {
	let {u_id} = req.body;
	let {postcode} = req.body;
	let {cityname} = req.body;
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

//RESTAURANTS

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
  
  
 //FOODS
 
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
  
//ORDERS

router.post("/addorder", async (req, res) => {
	let {u_id} = req.body;
	let {fid} = req.body;
	let {ordertime} = req.body;
	let {sumprice} = req.body;
	await new DAOorder().createOrder(u_id,fid,ordertime,sumprice);
	return res.redirect('/')
});
  
router.get("/editorder/:id", async (req, res) => {
    let id = req.params.id;
    let order = await new DAOorder().getOneOrder(id);
    res.render("update-order", { model: order });
  });
  
router.post("/updateorder/:id", async (req, res) => {
    let id = req.params.id;
    let {u_id} = req.body;
	let {fid} = req.body;
	let {ordertime} = req.body;
	let {sumprice} = req.body;
    await new DAOorder().updateOrder(id,u_id,fid,ordertime,sumprice);
    res.redirect("/");
});
  
router.post("/deleteorder/:id", async (req, res) => {
    let id = req.params.id;
    await new DAOorder().deleteOrder(id);
    res.redirect("/");
  });

router.get("/login", async(req,res) =>{
	res.render('login.ejs');
});

router.get("/register", async(req,res) =>{
	res.render('register.ejs');
});

console.log(passport);
router.post('/login', temp.checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

//Functions


module.exports = router;
