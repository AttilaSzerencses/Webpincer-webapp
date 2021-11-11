const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const  pool  = require("../config/dbConfig");
const router = express.Router();
const passport = require("passport");
const initializePassport = require("../config/passportConfig");
initializePassport(passport);
const DAOuser = require('../dao/user-dao');
const DAOrestaurant = require('../dao/restaurants-dao');
const DAOfood = require('../dao/food-dao');
const DAOlocation = require('../dao/location-dao');
const DAOorder = require('../dao/order-dao');


router.get("/", (req, res) => {
	res.render("index");
});

router.get("/restaurant", checkNotAuthenticated ,async(req,res)=>{
	let foods = await new DAOfood().getAllFoodFromRestaurant(10);
	console.log(foods);
	res.render("restaurant",{
		foods:foods
	});
});

router.post("/order",checkNotAuthenticated,async(req,res)=>{
	let order=await new DAOfood().getOneFood(req.body.ham);
	console.log(req.body.ham);
	console.log(order);
	let restaurantUser=await new DAOuser().getOneUser(order.u_id);
	let location=await new DAOlocation().getLocationByUID(order.u_id);
	let restaurant=await new DAOrestaurant().getRestaurantByUID(order.u_id);
	res.render("order",{
		order:order,
		restaurant:restaurant,
		location:location,
		restaurantUser:restaurantUser
	});
});

router.post("/ordered",checkNotAuthenticated,async(req,res)=>{
	let food=await new DAOfood().getOneFood(req.body.fid);
	let restaurant=await new DAOrestaurant().getRestaurantByUID(food.u_id);
	console.log(typeof req.user.id+" "+req.user.id);
	console.log(typeof food.id+" "+food.id);
	console.log(typeof restaurant.cprice+" "+restaurant.cprice);
	console.log(typeof food.price+" "+food.price);
	await new DAOorder().createOrder(parseInt(req.user.id),parseInt(food.id),60,parseInt(restaurant.cprice)+parseInt(food.price));
	//TODO
	res.render('index',{message:"A rendelés megtörtént"});
});


router.get("/admin",checkNotAuthenticated, checkIfAdmin, async (req, res) => {
	let users = await new DAOuser().getUsers();
	let locations = await new DAOlocation().getLocations();
	let restaurants = await new DAOrestaurant().getRestaurants();
	let orders = await new DAOorder().getOrders();
	let foods = await new DAOfood().getFoods();
	
	return res.render('admin',
		{ 	users : users,
			locations : locations,
			restaurants : restaurants,
			orders : orders,
			foods : foods
		});
});

router.get("/register" , checkAuthenticated, (req,res) => {
	res.render("register");
});

router.get("/login", checkAuthenticated, (req, res) => {
	res.render("login");
});

router.get("/dashboard", checkNotAuthenticated, async (req, res) => {
	res.render("dashboard", 
	{user: req.user.name});
});

router.get("/kereses", async (req,res) => {
	let users=await new DAOuser().getUsersByPermission("u");
	
	let restaurants=await new DAOrestaurant().getRestaurants();
	
	
	restaurants.sort((a,b)=>{
		if(a.id>b.id){
			return -1;
		}
		else{
			return 1;
		}
	})
	let locations=[];
	for(const restaurant of restaurants){
		locations.push(await new DAOlocation().getLocationByUID(restaurant.u_id));
	}
	res.render("kereses",
	{
	users:users,
	restaurants:restaurants,
	locations:locations
	});
});


router.get("/kapcsolatok", (req,res) => {
	res.render("kapcsolatok");
});

router.get("/aszf", (req,res) => {
	res.render("aszf");
});

router.get("/logout", (req,res)=>{
	req.logOut();
	req.flash("success_msg","Sikeresen kijelentkeztél!");
	res.redirect("/");
})

router.post('/register', async (req,res)=> {
	let {name, email, password, phone, postcode, city, street, streetnumber, other} = req.body;

	let errors = [];

	if (!name || !email || !password || !phone ||!postcode ||!city ||!street ||!streetnumber) {
		errors.push({ message: "Az összes mező kitöltése kötelező!" });
	}

	if (password.length < 6) {
		errors.push({ message: "A jelszava minimum 6 karakter legyen!" });
	}

	if (errors.length > 0) {
		res.render("register", { errors, name, email, password, phone, postcode, city, street, streetnumber, other });
	} 
	
	
	
	else {
		let hashedPassword = await bcrypt.hash(password, 10);
		let user=await new DAOuser().getUserByEmail(email);
		if(user.rows.length!==0){
				return res.render("register", {
					message: "Ezzel az email-el már regisztráltak!"
				});
			}
		else {
			await new DAOuser().createUser(hashedPassword,email,name,phone);
			user = await new DAOuser().getUserByEmail(email);
			new DAOlocation().createLocation(user.rows[0].id,postcode,city,street,streetnumber,other);
			req.flash("success_msg", "Sikeres regisztráció! Jelentkezz be!");
			res.redirect("/login");
		}
	}
});

router.post("/login",passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})
);

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/dashboard");
	}
	next();
}

function checkIfAdmin(req,res,next){
	if(req.user.permission!=='a'){
		return res.send("Not an admin");
	}
	return next();
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.render("login",{message: 'Mielőtt megtennéd, jelentkezz be!'});
}


//USER
  
router.post("/adduser",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
	let {password} = req.body;
	let hashedPassword = await bcrypt.hash(password, 10);
	let {email} = req.body;
	let {name} = req.body;
	let {phone} = req.body;
	await new DAOuser().createUser(hashedPassword, email, name,phone);
	return res.redirect('/admin')
});
  
router.get("/edituser/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let user = await new DAOuser().getOneUser(id);
    res.render("update-user", { model: user });
  });
  
router.post("/updateuser/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let {permission} = req.body;
	let {email} = req.body;
	let {name} = req.body;
	let {phone} = req.body;
    await new DAOuser().updateUser(id, name, email, permission, phone);
    res.redirect("/admin");
});
  
router.post("/deleteuser/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
	
	await new DAOorder().deleteUIDOrder(id);
	await new DAOfood().deleteUIDFood(id);
    await new DAOlocation().deleteUIDLocation(id);
	await new DAOrestaurant().deleteUIDRestaurant(id);
    await new DAOuser().deleteUser(id);
    res.redirect("/admin");
  });

//LOCATION

router.post("/addlocation",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
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
  
router.get("/editlocation/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let location = await new DAOlocation().getOneLocation(id);
    res.render("update-location", { model: location });
  });
  
router.post("/updatelocation/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
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
  
router.post("/deletelocation/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    await  new DAOlocation().deleteLocation(id);
    res.redirect("/");
  });

//RESTAURANTS

router.post("/addrestaurant",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
	let {u_id} = req.body;
	let {opens} = req.body;
	let {closes} = req.body;
	let {cprice} = req.body;
	let {restaurantpic} = req.body;
	await new DAOrestaurant().createRestaurant(u_id,opens,closes,cprice,restaurantpic);
	return res.redirect('/')
});
  
router.get("/editrestaurant/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let restaurant = await new DAOrestaurant().getOneRestaurant(id);
    res.render("update-restaurant", { model: restaurant });
  });
  
router.post("/updaterestaurant/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let {u_id} = req.body;
	let {opens} = req.body;
	let {closes} = req.body;
	let {cprice} = req.body;
	let {restaurantpic} = req.body;
    await new DAOrestaurant().updateRestaurant(id,u_id,opens,closes,cprice,restaurantpic);
    res.redirect("/");
});
  
router.post("/deleterestaurant/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    await  new DAOrestaurant().deleteRestaurant(id);
    res.redirect("/");
  });
  
  
 //FOODS
 
 router.post("/addfood",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
	let {u_id} = req.body;
	let {foodname} = req.body;
	let {price} = req.body;
	let {foodpic} = req.body;
	await new DAOfood().createFood(u_id,foodname,price,foodpic);
	return res.redirect('/')
});
  
router.get("/editfood/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let food = await new DAOfood().getOneFood(id);
    res.render("update-food", { model: food });
  });
  
router.post("/updatefood/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let {u_id} = req.body;
	let {foodname} = req.body;
	let {price} = req.body;
	let {foodpic} = req.body;
    await new DAOfood().updateFood(id,u_id,foodname,price,foodpic);
    res.redirect("/");
});
  
router.post("/deletefood/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
	await new DAOorder.deleteFIDOrder(id);
    await new DAOfood().deleteFood(id);
    res.redirect("/");
  });
  
//ORDERS

router.post("/addorder",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
	let {u_id} = req.body;
	let {fid} = req.body;
	let {ordertime} = req.body;
	let {sumprice} = req.body;
	await new DAOorder().createOrder(u_id,fid,ordertime,sumprice);
	return res.redirect('/')
});
  
router.get("/editorder/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let order = await new DAOorder().getOneOrder(id);
    res.render("update-order", { model: order });
  });
  
router.post("/updateorder/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    let {u_id} = req.body;
	let {fid} = req.body;
	let {ordertime} = req.body;
	let {sumprice} = req.body;
    await new DAOorder().updateOrder(id,u_id,fid,ordertime,sumprice);
    res.redirect("/");
});
  
router.post("/deleteorder/:id",checkNotAuthenticated,checkIfAdmin, async (req, res) => {
    let id = req.params.id;
    await  new DAOorder().deleteOrder(id);
    res.redirect("/");
  });

module.exports = router;
