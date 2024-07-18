const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");
const app = express();


// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:5173', 'http://127.0.0.1:5173/', 'http://127.0.0.1:5174/', 'http://localhost:5174/'],
// }));
app.use (cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//Database connection mongoDB

mongoose.connect("mongodb://adododjialban:arnold18@ac-ck0eroa-shard-00-00.mgvswnw.mongodb.net:27017,ac-ck0eroa-shard-00-01.mgvswnw.mongodb.net:27017,ac-ck0eroa-shard-00-02.mgvswnw.mongodb.net:27017/Marchanza?replicaSet=atlas-mobsbr-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");

// API creation 


app.get("/", (req, res)=>{
    res.send("Express app is Running")
})


// image storage engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=> {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

// creating endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req, res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creatind products
const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        default: Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})
app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length >0 ){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id= last_product.id+1;
    }else{
        id = 1;
    }


    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Ajouter");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creating api for deleting products
app.post('/removeproduct',async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Supprimer");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creationg api for getting all products
app.get("/allproducts",async(req, res)=> {
    let products = await Product.find({});
    console.log(" Liste des products ")
    res.send(products);
})


// schema  creating for user
const User = mongoose.model('User',{
     name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

// creating endpoint for registering user
app.post('/signup', async(req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({
            success:false,
            error:'Existing user found with same email',
        });
    }
    let cart ={};
    for (let i = 0; i < 300; i++){
        cart[i]= 0;
    }
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    
    await user.save();
    const data = {
        user:{
            id:user.id,
        },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({success:true, token})
})


// creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passMatch = req.body.password === user.password;
        if (passMatch) {
            const data = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: "wrong password" });
        }
    } else {
        res.json({ success: false, error: "wrong email address" });
    }
});



// creating endpoint for newcollection data
app.get('/newcollection', async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection Fetched");
    res.send(newcollection);
})

// creating endpoint for popular products in clothing data
app.get('/popularproducts', async (req,res)=>{
    let products = await Product.find({category:'clothing'});
    let popularproducts = products.slice(0, 4);
    console.log("Popularproducts Fetched");
    res.send(popularproducts);
})


// MIDDLE WARE TO FETCH USER
const fetchUser = async (req, res, next )=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: 'please authenticate using valid login '});
    }else{
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors: "please authenticate using valid token"});
            
        }
    }

};

// creating endpoint for adding  products
app.post('/addtoCart', fetchUser, async (req, res)=>{
    console.log('Added',req.body.itemId);
    let userData = await  User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('added');
});



// creating endpoint for remove product
app.post('/removefromcart', fetchUser, async (req, res)=>{
    console.log('Remove',req.body.itemId);
    let userData = await  User.findOne({_id:req.user.id});
    if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.ItemId] += 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Remove');
});



// endpoint pour la recherche 
app.post('/searchproducts', async (req, res) => {
    const { searchTerm } = req.body;
    const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } });
    res.json(products);
  });
  



// creating endpointfor getting cartdata 
app.post('/getcart', fetchUser, async(req, res ) => {
    console.log('get cart');
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (error) =>{
    if (!error){
        console.log("Server is Running on port  " +port)
    } else{
        console.log("error: " +error)
    }
})