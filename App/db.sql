CREATE TABLE USERS (
	id SERIAL PRIMARY KEY,
	permission varchar(1) NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	phone varchar(15) NOT NULL,
	cardnumber varchar(30) NOT NULL
	
);

CREATE TABLE LOCATIONS (
	id SERIAL PRIMARY KEY,
	u_id INT NOT NULL,
	postcode dec(4) NOT NULL,
	cityname varchar(30) NOT NULL,
	street varchar(30) NOT NULL,
	streetnumber INT NOT NULL,
	other varchar(30) NOT NULL,
	CONSTRAINT fk_uid
		FOREIGN KEY(u_id)
			REFERENCES USERS(id)
);

CREATE TABLE RESTAURANTS (
	id SERIAL PRIMARY KEY,
	u_id INT NOT NULL,
	opens varchar(30) NOT NULL,
	closes varchar(30) NOT NULL,
	cprice INT NOT NULL,
	restaurantpic varchar(100) NOT NULL,
	CONSTRAINT fk_uid
		FOREIGN KEY(u_id) 
			REFERENCES USERS(id)
);

CREATE TABLE FOODS (
	id SERIAL PRIMARY KEY,
	u_id INT NOT NULL,
	foodname varchar(30) NOT NULL,
	price INT NOT NULL,
	foodpic varchar(100) NOT NULL,
	CONSTRAINT fk_uid	
		FOREIGN KEY(u_id) 
			REFERENCES USERS(id)
);

CREATE TABLE ORDERS (
	id SERIAL PRIMARY KEY,
	u_id INT NOT NULL,
	fid INT NOT NULL,
	ordertime INT NOT NULL,
	sumprice INT NOT NULL,
	CONSTRAINT fk_uid
		FOREIGN KEY(u_id) 
			REFERENCES USERS(id),
	CONSTRAINT fk_fid
		FOREIGN KEY(fid) 
			REFERENCES FOODS(id)
);

INSERT INTO USERS(permission,username,password,email,name,phone,cardnumber) VALUES ('u','felhasznalo1','jelszo1','email1@email.hu','Teszt_Elek1','062012345678','00000000-00000000-00000000');
INSERT INTO USERS(permission,username,password,email,name,phone,cardnumber) VALUES ('u','felhasznalo2','jelszo2','email2@email.hu','Teszt_Elek2','062087654321','10000000-10000000-10000000');
INSERT INTO USERS(permission,username,password,email,name,phone,cardnumber) VALUES ('r','fisfosbufe','etterem1','email3@email.hu','Kingfos_Bufe','062069696969','10000001-10000001-10000001');
INSERT INTO LOCATIONS(u_id,postcode,cityname,street,streetnumber,other) VALUES ('1','6700', 'Szeged', 'Csanadi', '17', '9.em 52-es ajto');
INSERT INTO LOCATIONS(u_id,postcode,cityname,street,streetnumber,other) VALUES ('2','6701', 'Szeged', 'Asd', '15', '7.em 1-es ajto');
INSERT INTO LOCATIONS(u_id,postcode,cityname,street,streetnumber,other) VALUES ('3','6701', 'Szeged', 'Asdasd', '151', '1.em 9-es ajto');
INSERT INTO RESTAURANTS(u_id,opens,closes,cprice,restaurantpic) VALUES ('3','7:00','15:00','570','etterem1.jpg');
INSERT INTO FOODS(u_id,foodname,price,foodpic) VALUES ('3','Hamburger','1500','hambi.png');
INSERT INTO FOODS(u_id,foodname,price,foodpic) VALUES ('3','Pizza','1800','pizza.png');
INSERT INTO FOODS(u_id,foodname,price,foodpic) VALUES ('3','Hotdog','600','hotdog.png');
INSERT INTO ORDERS(u_id,fid,ordertime,sumprice) VALUES ('3','2','660','2000');


