const pccomponentes = require('../scrapers/pccomponentes');

const scrapers = {};

async function search(req, res) {
  //TODO: create searchParams class model
  const searchParams = {
    term: req.query.term,
    shops: req.query.shops,
    nProductsPerShop: req.query.nProductsPerShop
  };

  console.log('SearchParams:', searchParams);
  
  scrapers.pccomponentes = new pccomponentes(searchParams.term, searchParams.nProductsPerShop);

  let products = [];

  try {
    products = await getProducts(searchParams.shops);
  } catch (e) {
    console.error(e);
  }

  const response = {
    resp: {products},
    msg: ''
  };

  return res.status(200).send(response);
}

/**
 * Perform the search on the specified shops
 * @param {[]} shops
 * @returns {Product[]}
 */
async function getProducts(shops) {
  let products = [],
    scrappedProds = [];

  for (let shopId of shops) {
    try {
      scrappedProds = await scrapers[shopId].getProducts(); //This is returning a string (response obj?)
      products = [...products, ...scrappedProds]; //TODO: test this: product.push(...scrappedProds);
    } catch (e) {
      console.error(`Error scraping shop ${shopId}:`, e);
    }
  }

  return products;
}

module.exports = {
  search
};
