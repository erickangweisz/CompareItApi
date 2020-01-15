const puppeteer = require('puppeteer');
const Product = require('../models/product');

const domain = 'https://www.amazon.es/';

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
      await page.goto(domain, { timeout: 3000000 });
      await page.type('#twotabsearchtextbox', this.term);
      await page.click('input.nav-input');
      await page.waitForSelector('.s-image');

      const products = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('.s-result-item'));
        return links.map(link => {
          return { // TODO: wrap this with Product class to return it
            name: link.querySelector(".a-size-medium.a-color-base.a-text-normal").innerText,
            price: '0,99',//link.querySelectorAll(".a-price-whole").innerText,
            url: link.querySelector(".a-link-normal.a-text-normal").href,
            image: link.querySelector(".s-image").src,
            shopname: 'amazon.es'
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
