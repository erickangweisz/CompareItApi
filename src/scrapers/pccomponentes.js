const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const Product = require('../models/product');

const baseUrl = 'https://www.pccomponentes.com';

class Scraper {
  async getProducts(term) {
    let products = [];

    try {
      products = await requestPromise(
        `${baseUrl}/buscar/?query=${term}`,
        (err, res, html) => {
          if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html);
            const products = [];

            $('.tarjeta-articulo')
              .slice(0, 2)
              .each((i, productHTML) => {
                const name = $(productHTML).data('name');
                const price = $(productHTML).data('price');
                const url = `${baseUrl}${$(productHTML)
                  .find('.enlace-superpuesto')
                  .attr('href')}`;

                const product = new Product(name, price, url);
                products.push(product);
              });

            console.log('Products:', products);
            return products;
          }
        }
      );
    } catch (e) {
      console.error(e);
    }

    return products;
  }
}

module.exports = Scraper;
