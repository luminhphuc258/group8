const Product = require('../models/products');

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('index', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/',
      isAuthenticated: req.isLoggedIn
    });
  })
  .catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('products', {
        prods: products,
        pageTitle: 'All Products',
        path: '/admin/products',
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};


exports.getAddProduct = (req, res, next) => {
res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: true
});
};


exports.postAddProduct = (req, res, next) => {
  Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  })
  .then(result => {
    console.log('CREATED PRODUCT');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
};


exports.getEditProduct = (req,res,next)=>{
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if(!product){
        return res.redirect('/');
      }
      res.render('add-product',{
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => { console.log(err); });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DELETED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {console.log(err)}); 
};