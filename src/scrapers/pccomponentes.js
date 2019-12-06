const requestPromise = require('request-promise');
const cheerio = require('cheerio');

class Scraper {
  async getProducts(term) {
    let products = [];

    try {
      products = await requestPromise(
        `https://www.pccomponentes.com/buscar/?query=${term}`,
        (err, res, html) => {
          if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html);
            const products = [];

            $('article')
              .slice(0, 1)
              .each((i, article) => {
                const art = $(article).text();
                //TODO: get correct elements
                //TODO: "new Product()" model should be used here
                products.push(art);
              });

            console.error(products);
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
