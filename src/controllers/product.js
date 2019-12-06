const pccomponentes = require('../scrapers/pccomponentes');

const scrapers = {
  pccomponentes: new pccomponentes()
};

async function search(req, res) {
  //TODO: create searchParams class model
  const searchParams = {
    term: req.params.term,
    shops: ['pccomponentes'] //TODO: get this from req.params
  };

  console.log('SearchParams:', searchParams);

  let products = [];

  try {
    products = await getProducts(searchParams);
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
 * @param {{}} searchParams
 * @returns {Product[]}
 */
async function getProducts(searchParams) {
  let products = [],
    scrappedProds = [];

  for (let shopId of searchParams.shops) {
    try {
      scrappedProds = await scrapers[shopId].getProducts(searchParams.term); //This is returning a string (response obj?)
      products = [...products, scrappedProds]; //TODO: test this: product.push(...scrappedProds);
    } catch (e) {
      console.error(`Error scraping shop ${shopId}:`, e);
    }
  }

  return products;
}

module.exports = {
  search
};
