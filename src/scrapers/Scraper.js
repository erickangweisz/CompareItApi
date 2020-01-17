const puppeteer = require('puppeteer');

const shopScrapers = {
  //Add every shop scraper here
  pccomponentes: require('./pccomponentes')
};

/**
 * Init puppeteer. Scrap products from every given shop using its specific function.
 * @param {string} term
 * @param {string[]} shops
 * @param {number} nProducts
 * @returns {[]} products
 */
async function scrapProducts(term, shops, nProducts) {
  let products = [];

  try {
    const browser = await puppeteer.launch({
      defaultViewport: {width: 1280, height: 800}
    });
    const page = await browser.newPage();
    //Show logs from inside page.evaluate() to the node console
    //page.on('console', consoleObj => console.log(consoleObj.text()));

    for (const shopKey of shops)
      products = [
        ...products,
        ...(await shopScrapers[shopKey](page, term, nProducts))
      ];

    await browser.close();
  } catch (e) {
    console.log(e);
  }

  return products;
}

module.exports = scrapProducts;
