const puppeteer = require('puppeteer');
const Product = require('../models/product');

const domain = 'https://www.pccomponentes.com';

class Scraper {
  constructor(term, nProducts) {
    this.term = term;
    this.nProducts = +nProducts;
  }

  async getProducts() {
    let products = [];

    try {
      const browser = await puppeteer.launch({
        defaultViewport: {width: 1280, height: 800}
      });
      const page = await browser.newPage();
      //page.on('console', consoleObj => console.log(consoleObj.text())); //Needed to show logs from inside page.evaluate() to the node console

      await page.goto(domain);
      await page.type('.ais-SearchBox-input', this.term);
      await page.waitForSelector('.ais-Hits-item');

      products = await page.evaluate(this.scrapProducts, this.nProducts);

      await browser.close();
    } catch (e) {
      console.log(e);
    }

    return products;
  }

  /**
   * Callback for page.evaluate()
   * Se tendria que hacer una funcion de estas por cada tienda, ya que los valores a scrapear pueden estar en distintos sitios
   * @param {number} nProducts
   */
  scrapProducts(nProducts) {
    const productElements = Array.from(
      document.querySelectorAll('.ais-Hits-item')
    ).slice(0, nProducts);

    return productElements.map(pe => {
      var link = pe.querySelector('.algolia-analytics-link');

      // TODO: wrap this with Product class to return it
      return {
        name: link.getAttribute('data-name'),
        price: link.getAttribute('data-price'),
        url: link.href,
        image: pe.querySelector('img').src,
        shopname: 'pccomponentes.com' //TODO: send imagotipo url instead
      };
    });
  }
}

module.exports = Scraper;
