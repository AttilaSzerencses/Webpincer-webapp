const express = require("express");
const router = express.Router();
const DAOorder = require('../DAOorder/order-DAOorder');


router.get("/", async (req, res) => {
    let orders = await new DAOorder().getOrders();
    return res.render('index',{ orders : orders });
  });
 
 
//INSERT INTO ORDERS(u_id,fid,ordertime,sumprice)
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
    await  new DAOorder().deleteOrder(id);
    res.redirect("/");
  });

module.exports = router;
