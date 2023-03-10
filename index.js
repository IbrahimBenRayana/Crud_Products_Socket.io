//CRUD of the product using socket.io 

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('./Product/Model');
const cors = require('cors');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }   
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



// SOCKET IO NOTIFICATIONS
function sendNotification(msg) {
    io.emit("notification", msg);
    console.log(msg);
  }

//create new Product object 



/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
    Product.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
        sendNotification("All products.");
    });
    }
);

/* GET SINGLE PRODUCT BY ID */

router.get('/:id', function(req, res, next) {
    Product.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
        sendNotification("Products By Id");
    });
}
);

/* SAVE PRODUCT */
router.post('/add', function(req, res, next) {
    const Libelle = String(req.body.Libelle) ; 
    const prix = Number(req.body.prix) ;
    const Quantite = Number(req.body.Quantite) ;
    const Designation = String(req.body.Designation) ;

    const newProduct = new Product({
        Libelle,
        prix,
        Quantite,
        Designation
    });

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    sendNotification("Product Added");

}
);

//Recherche par libelle 
router.get('/search/:libelle', function(req, res, next) {
    Product.find({Libelle: req.params.libelle}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}
);

//Delete produit 
router.delete('/:id', function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
        sendNotification("Product Deleted");
    });
});

