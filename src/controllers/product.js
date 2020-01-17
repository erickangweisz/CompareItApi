const SearchParams = require('../models/searchParams');
const scrapProducts = require('../scrapers/Scraper');

async function search(req, res) {
  const searchParams = new SearchParams(
    req.query.term,
    req.query.shops,
    req.query.nProductsPerShop
  );

  let products = [];

  try {
    products = await scrapProducts(
      searchParams.term,
      searchParams.shops,
      searchParams.nProductsPerShop
    );
  } catch (err) {
    console.error(err);
  }

  const response = {
    resp: {products},
    msg: ''
  };

  return res.status(200).send(response);
}

module.exports = {
  search
};
