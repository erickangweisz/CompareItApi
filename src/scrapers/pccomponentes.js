const puppeteer = require('puppeteer');
const Product = require('../models/product');

const domain = 'https://www.pccomponentes.com';

class Scraper {
  constructor(term, nProducts) {
    this.term = term;
    this.nProducts = nProducts;
  }

  async getProducts() {
    let products = [];

    try {
      products = this.scrapProductsFromBrowser();
    } catch (e) {
      console.error(e);
    }

    return products;
  }

  async scrapProductsFromBrowser() {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(domain, { timeout: 3000000 }); // TODO: Check timeout value
      await page.type('.ais-SearchBox-input', this.term);
      await page.waitForSelector('.ais-Hits-item');

      const products = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('.ais-Hits-item'));
        return links.map(link => {
          return { // TODO: wrap this with Product class to return it
            name: link.querySelector('.algolia-analytics-link').getAttribute('data-name'),
            price: link.querySelector('.algolia-analytics-link').getAttribute('data-price'),
            url: link.querySelector('.algolia-analytics-link').href,
            image: link.querySelector('img').src
          }
        })
      });
      await browser.close();
      return products.slice(0, Number(this.nProducts));
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Scraper;
