const Pccomponentes = require('../scrapers/pccomponentes');
const Amazon = require('../scrapers/amazon');
const SearchParams = require('../models/searchParams');

const scrapers = {};

async function search(req, res) {
  const searchParams = new SearchParams(
    req.query.term,
    req.query.shops,
    req.query.nProductsPerShop
  );
  
  scrapers.pccomponentes = new Pccomponentes(searchParams.term, searchParams.nProductsPerShop);
  scrapers.amazon = new Amazon(searchParams.term, searchParams.nProductsPerShop);

  let products = [];

  try {
    products = await getProducts(searchParams.shops);
  } catch (err) {
    console.error(err);
  }

  const response = {
    resp: { products },
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

  for (let shopIds of shops) {
    try {
      for (let i=0; i<shopIds.split(',').length; i++) {
        scrappedProds = await scrapers[shopIds.split(',')[i]].getProducts(); // This is returning a string (response obj?)
        products = [...products, ...scrappedProds]; //TODO: test this: product.push(...scrappedProds);
      }
    } catch (e) {
      console.error(`Error scraping shop ${shopIds}:`, e);
    }
  }

  return products;
}

module.exports = {
  search
};
