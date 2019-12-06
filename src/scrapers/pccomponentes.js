const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const Product = require('../models/product');

const baseUrl = 'https://www.pccomponentes.com';

class Scraper {
  async getProducts(term) {
    let products = [],
      html = '';

    try {
      html = await requestPromise(`${baseUrl}/buscar/?query=${term}`);
      products = this.scrapProducts(html);
    } catch (e) {
      console.error(e);
    }

    return products;
  }

  scrapProducts(html) {
    const products = [],
      $ = cheerio.load(html);

    $('.tarjeta-articulo')
      .slice(0, 2) //TODO: take second parameter form searchParams (to be sended to the scraper)
      .each((i, productHTML) => {
        const name = $(productHTML).data('name');
        const price = $(productHTML).data('price');
        const url = `${baseUrl}${$(productHTML)
          .find('.enlace-superpuesto')
          .attr('href')}`;

        products.push(new Product(name, price, url));
      });

    return products;
  }
}

module.exports = Scraper;
