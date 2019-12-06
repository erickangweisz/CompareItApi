const requestPromise = require('request-promise')
const cheerio = require('cheerio')

class Scraper {
    async getProducts(term) {
        let products = [];
        
        try {
           const products = await requestPromise(
                `https://www.pccomponentes.com/buscar/?query=${term}`, 
                (err, res, html) => {
                    if (!err && res.statusCode == 200) {
                        const $ = cheerio.load(html);
                        const products = [];
        
                        $('article').slice(0, 5).each((i, article) => {
                            const art = $(article).text();
                            console.log('Article', i);
        
                            //TODO: get correct elements
                            //TODO: "new Product()" model should be used here
                            console.log('art', art)
                            products.push(art); 
                        });
                        
                        return products;
                    }
                }
            );

            return products;
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = Scraper;