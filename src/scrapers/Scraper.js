const puppeteer = require('puppeteer');

/** Add every shop here */
const shops = {
  pcComponentes: require('./pccomponentes')
};

class Scraper {
  constructor(term, nProducts, shops = ['pcComponentes']) {
    this.term = term;
    this.nProducts = +nProducts;
    this.shops = shops; //TODO: keys of the shops to be scraped
  }

  async getProducts() {
    let products = [];

    try {
      const browser = await puppeteer.launch({
        defaultViewport: {width: 1280, height: 800}
      });
      const page = await browser.newPage();
      //Show logs from inside page.evaluate() to the node console
      //page.on('console', consoleObj => console.log(consoleObj.text()));

      this.shops.forEach(async shopKey => {
        products = [
          ...products,
          ...shops[shopKey](page, this.term, this.nProducts)
        ];
      });

      await browser.close();
    } catch (e) {
      console.log(e);
    }

    return products;
  }
}

module.exports = Scraper;
