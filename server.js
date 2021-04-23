let express=require("express");
let app=express();
let  bodyParser = require("body-parser");
let mysql= require("mysql");
let session=require("express-session");
var MySQLStore = require('express-mysql-session')(session);
let methodOverride = require("method-override");
const { json } = require("body-parser");
let path = require('path');
let fileUpload = require('express-fileupload');
let  Cart = require('./models/cart.js')
app.use(bodyParser.urlencoded({ extended: true }));



//app.use(express.bodyParser())
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
//app.use(express.static(__dirname + "/public/stylesheets")); 
app.use(express.static(__dirname + "/public")); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use("/images",express.static(__dirname + "/public/images/uploaded_images")); 



//de ana zawdt-ha 3sham el image tzbot
app.use( express.static( "views" ) );



app.use(bodyParser.json());

/*app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    console.log(req.session);
    next()
  });*/
 


//-----------------------------------------------------------------------------------
//create connection
let db={
    host:'localhost',
    user:'root',
    password:'P@ssw0rd',
    database:'perfect_store'


};

//connect
/*db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("mysql connected");
});*/
var connection = mysql.createConnection(db);
var sessionStore = new MySQLStore({}/* session store options */, connection);

app.use(session({
    secret: 'secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180 * 60 * 1000 },
}));



//create db
function createdb(){
    let sql='CREATE DATABASE IF NOT EXISTS perfect_store';
    connection.query(sql, (err , result)=>{
        if(err) throw (err);
        console.log(result);
        
    });
}
createdb();
//----------------------------------------------------------------------------------------------------------------------------------------------------
//create table users
function createTableUsers(){
    let sql='CREATE TABLE IF NOT EXISTS  users(id int AUTO_INCREMENT,user_name VARCHAR(50) NOT NULL,password VARCHAR(50) NOT NULL,email VARCHAR(50) NOT NULL,address VARCHAR(200) NOT NULL,PRIMARY KEY (id))';
    connection.query(sql,(err , result)=>{
        if(err) throw (err);
        console.log(result);
    });
}
createTableUsers();
//insert into users
/*function insertUsers(user_name,password,email,address){
    let user={user_name:user_name,password:password,email:email,address:address};
    let sql='INSERT INTO  users set ?';
    let query=connection.query(sql,user,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return result.insertId;
    });
   
}*/
//insertUsers("ahmed","456","ahmed@gmail","smoha");
//select single user
function selectUser(id){
    let sql=`SELECT * FROM  users where id=${id} `;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("user",result);
    
    });
   
}
//selectUser(1);  

//update singleuser
function updateUser(name,address,email,id){
    let sql=`UPDATE users SET user_name='${name}',address='${address}' ,email='${email}' WHERE id=${id}`;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
    });

}
//---------------------------------------------------------------------------------------------------------------
//create table products
function createTableProducts(){
    let sql='CREATE TABLE IF NOT EXISTS  products(id int AUTO_INCREMENT,product_name VARCHAR(50) NOT NULL,price float  NOT NULL,img VARCHAR(255) NOT NULL,category enum("women","men")  NOT NULL,quantity int NOT NULL, description VARCHAR(200) NOT NULL, PRIMARY KEY (id))';
    connection.query(sql,(err , result)=>{
        if(err) throw (err);
        console.log(result);
    });
}
createTableProducts();
//insert into products
function insertProduct(product_name,price,img,category,quantity,description){
    let product={product_name:product_name,price:price,img:img,category:category,quantity:quantity,description:description};
    let sql='INSERT INTO  products set ?';
    let query=connection.query(sql,product,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return result.insertId;
    });
   
}


//select single product
function selectproductbyId(id){
    let sql=`SELECT * FROM  products where id=${id} `;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("product",result);
    
    });
   
}
//selectproductbyId(1);
function selectproductbycategory(category){
    let sql=`SELECT * FROM  products where category='${category}' `;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
        //console.log("product",result);
        return result;
    });
    
   
}
//console.log(selectproductbycategory("women"));
//console.log();
//console.log("name",result);
//selectproductbtcategory('women');

//update single product
function updateProduct(name,price,img,category,quantity,description,id){
    let sql=`UPDATE products SET product_name='${name}',price='${price}' ,img='${img}',category='${category}',quantity='${quantity}',description='${description}' WHERE id=${id}`;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
    });

}
//-----------------------------------------------------------------------------------------------------------------------------
function createTableOrders(){
    let sql='CREATE TABLE IF NOT EXISTS  orders(id int AUTO_INCREMENT,cart json,user_id int,username varchar(50),phonenumber varchar(50),address varchar(200),cardnumber varchar(200),totalprice float,totalQty int, PRIMARY KEY (id),FOREIGN KEY(user_id) REFERENCES users(id));';
    connection.query(sql,(err , result)=>{
        if(err) throw (err);
        console.log(result);
    });
}
createTableOrders();

function insertOrder(cart,user_id,username,phonenumber,address,cardnumber,totalprice,totalQty){
let order={cart:cart,user_id:user_id,username:username,phonenumber:phonenumber,address:address,cardnumber:cardnumber,totalprice:totalprice,totalQty:totalQty};
let sql='INSERT INTO  orders set  ?';
let query=connection.query(sql,order,(err,result)=>{
    if(err) throw err;
    console.log(result);
   
});
}


//-------------------------------------------------------------------------------------
//to show home page
app.get("/",function(req,res){
    res.render("Home",{currentUser:req.session.username});
});
//--------------------------------------------------------------------------------------
//user routes
//to show sign up page
app.get("/sign_up",function(req,res){
    res.render("sign up",{currentUser:req.session.username});
});
//to save data from sign up page
app.post("/sign_up",function(req,res){
    let user={user_name:req.body.username,password:req.body.password,email:req.body.email,address:req.body.address};
    let sql='INSERT INTO  users set ?';
    let query=connection.query(sql,user,(err,result)=>{
        if(err) throw err;
        console.log(result);
        req.session._id= result.insertId;
        console.log(req.session._id);
    req.session.loggedin = true;
    req.session.username = req.body.username;
    req.session.address=req.body.address;
    req.session.email=req.body.email;
   
   
    res.redirect("/");

    });
   
  // req.session._id= insertUsers(req.body.username,req.body.password,req.body.email,req.body.address);
   
   
});
//to show sign_in page
app.get("/sign_in",function(req,res){
   res.render("sign in",{currentUser:req.session.username});
});
//to check if user has account or not
app.post("/sign_in",function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        // check if user exists
        if(username=='admin'&&password=='admin')
        {
                req.session.loggedin = true;
                req.session.username = username;
                req.session.password = password;
                
            res.redirect("/");
        }

       else
       {

       
        connection.query('SELECT * FROM users WHERE user_name = ? AND password = ?', [username, password], function(error, results, fields) {
            
            if (results.length> 0) {
                req.session.loggedin = true;
                req.session.username = username;
                req.session.password = password;
                req.session.address=results[0].address;
                req.session.email=results[0].email;
                req.session._id=results[0].id;
               
               
                res.redirect("/");
            } else {
                res.send('Incorrect Username and/or Password!');
            }           
            
        });
    }
}
    
    else {
        res.send('Please enter Username and Password!');
        res.end();
   }

 

});
app.get("/sign_out",function(req,res){
    req.session.destroy();
    sessionStore.close();
    res.redirect("/");
})
//edit contact details
app.get("/edituser",function(req,res,next){
    if(req.session)
    {
        
        res.render("edituser",{currentUser:req.session.username,username:req.session.username,address:req.session.address,email:req.session.email,user_id:req.session.id});
    }
    
   
});
app.put("/edituser/:user_id",function(req,res){
    console.log(req.session._id);
    updateUser(req.body.username,req.body.address,req.body.email,req.session._id);
    req.session.loggedin = true;
    req.session.username =req.body.username;
    req.session.address=req.body.address;
    req.session.email=req.body.email;
    res.redirect("/");

   
});
      
//-------------------------------------------------------------------------------------------------
//de ana zawdt-haaaaaaaaaaaaaaaaaaaaaaaa 3shan el dashboard 
//to show dashboard
app.get("/dashboard",function(req,res){
    let sql=`SELECT * FROM  products  `;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
       // result.forEach(result => console.log(result.product_name));
     //  console.log(req.session.username);
      // console.log(req.session);
        res.render("dashboard",{currentUser:req.session.username,results:result});
        //return result;
    });
   // res.render("dashboard");

});

app.post("/dashboard/:id/add-to-cart",function(req,res){
   // res.send("hello cart");
   let productid = req.params.id;
  
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  
  let sql=`SELECT * FROM  products where id=${productid} `;
  let query=connection.query(sql,(err,result)=>{
      if(err) throw err;
      //console.log("product",result[0]);
      cart.add(result[0], result[0].id);
      req.session.cart = cart;
    

    res.redirect("/dashboard");
     
     
  });
    
  });
  app.get("/dashboard/:id/remove/", function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log("cart befor deletion",cart);
    cart.removeItem(productId);
    console.log("cart after deletion",cart)
    req.session.cart = cart;
    res.redirect("/shopping-cart");
  });
  
  app.get("/shopping-cart",isloggedin, function (req, res) {
    if (!req.session.cart) {
      return res.render("shopping-cart", { currentUser:req.session.username,products: null });
    }
    
    var cart = new Cart(req.session.cart);
    var products = cart.generateArray();
    if (products=="") {
        return res.render("shopping-cart", { currentUser:req.session.username,products: null });
      }
  //console.log("products ele fel cart",products);
    res.render("shopping-cart", {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
      currentUser:req.session.username
    });
  });
  app.get("/checkout", isloggedin, function (req, res) {
    if (!req.session.cart) {
         return res.redirect("/shopping-cart");
        }
    var cart = new Cart(req.session.cart);
    res.render("checkout", { currentUser:req.session.username,total: cart.totalPrice });
      });
    
   app.post("/checkout",isloggedin,function(req,res){
       let username=req.body.username;
       let phonenumber=req.body.phonenumber;
       let address=req.body.address;
       let cardnumber=req.body.cardnumber;
       let user_id=req.session._id;
    if (!req.session.cart) {
      return res.redirect("/shopping-cart");
    } else {
      var cart = new Cart(req.session.cart);
      var items=cart.generateArray();
      var cartjson=JSON.stringify(items);
      insertOrder(cartjson,user_id,username,phonenumber,address,cardnumber,cart.totalPrice,cart.totalQty)
      console.log(cart.totalPrice);
      req.session.cart = null;
      res.redirect("/");

    }
   })


  app.get("/order",function(req,res){
   
    let arr=[];
    let sql=`SELECT * FROM  orders `;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
      
       console.log(typeof(result));
      
      /*  result.forEach(function(result) {
         
          
           
            });*/
            for(let i=0;i<result.length;i++)
            {
                let obj={};
                obj.id=result[i].id;
                obj.totalprice=result[i].totalprice;
                obj.totalQty=result[i].totalQty;
                obj.user_id=result[i].user_id;
                obj.username=result[i].username;
                obj.address=result[i].address;
                obj.cart=JSON.parse(result[i].cart);
                
                arr.push(obj);
            }
            console.log("arr",arr);

          //  console.log("obj",obj);
          //  console.log("arr",arr);
        
        //  console.log(arr);
         arr.forEach(function(arr) {
         arr.cart.forEach(function (b){
            // console.log(b.id);
             
            }) 
            console.log("------------");
        })
        //return result;
        res.render("order",{currentUser:req.session.username,orders:arr});
    });
    
     
  })  


//Add products by admin
app.get("/add_product",function(req,res){
    res.render("add_product",{currentUser:req.session.username});



});

app.post("/add_product",function(req,res){

   
    if (req.files)
				{
                    var file = req.files.uploaded_image;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/uploaded_images/'+file.name, function(err) {         
	                 if (err)
	                return res.status(500).send(err);
					   });

                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
		
                    } 
                }
                    else if(req.body.link_image !="")
                    img_name=req.body.link_image;
         
           
          
          req.session._id=insertProduct(req.body.product_name,parseFloat(req.body.price),img_name,req.body.category,req.body.quantity,req.body.description);
          res.redirect("/dashboard");
   
 
})

app.get("/dashboard/:id/editproduct",function(req,res){
    let id=req.params.id;
    let sql=`SELECT * FROM  products where id=${id} `;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("product",result[0].img);
       res.render("editproduct",{currentUser:req.session.username,id:id,productname:result[0].product_name,price:result[0].price,img:result[0].img,quantity:result[0].quantity,category:result[0].category,desc:result[0].description});
       
    });
    
})
app.put("/dashboard/:id/editproduct",function(req,res){
    let id=req.params.id;
    if (req.files)
				{
                    var file = req.files.uploaded_image;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/uploaded_images/'+file.name, function(err) {         
	                 if (err)
	                return res.status(500).send(err);
					   });

                }
                else {
                    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
		
                    } 
                }
                    else if(req.body.link_image !="")
                    img_name=req.body.link_image;
                   
         
           
          
        updateProduct(req.body.product_name,req.body.price,img_name,req.body.category,req.body.quantity,req.body.description,id);
          res.redirect("/dashboard");
   
 
})

   




//----------------------------------------------------------------------------------------------------------------
function isAdmin(req,res,next)
{
    //console.log(req.session.username);
    if( req.session.loggedin)
    {

        
       if(req.session.username=="admin"&&req.session.password=="admin") {
        
        next();
       // console.log("fe moshkela");
       }

       
       else
       console.log("you are not admin");
       res.redirect("/sign_in");
    }
    else
    res.redirect("/sign_in");
    
}
function isloggedin(req,res,next)
{
    if( req.session.loggedin)
    {
       
       
         next();
        
    }
    else
    res.redirect("/sign_in")
}



app.listen(8080);