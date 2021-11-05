const express = require("express");
const router = express.Router();
const DAO = require('../dao/user-dao');
const DAOlocation = require('../dao/location-dao');


router.get("/", async (req, res) => {
    let users = await new DAO().getUsers();
    return res.render('index',{ users : users });
  });
  
router.post("/adduser", async (req, res) => {
	let {username} = req.body;
	let {password} = req.body;
	let {email} = req.body;
	let {name} = req.body;
	let {phone} = req.body;
	let {cardnumber} = req.body;
	await new DAO().createUser(username, password, email, name,phone,cardnumber);
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
    await new DAO().updateUser(id, permission, username, pw, email, name,phone,cardnumber);
    res.redirect("/");
});
  
router.post("/deleteuser/:id", async (req, res) => {
    let id = req.params.id;
    await  new DAOlocation().deleteLocation(id);
    await new DAO().deleteUser(id);
    res.redirect("/");
  });

module.exports = router;
