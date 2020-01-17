/**
 * Navigate to shop, perform search and scrapProducts
 * @param page puppeteer browser.newPage() instance
 * @param {string} searchTerm
 * @param {number} nProducts
 */
async function scrapShop(page, searchTerm, nProducts) {
  let products = [];

  try {
    await page.goto('https://www.pccomponentes.com');
    await page.type('.ais-SearchBox-input', searchTerm);
    await page.waitForSelector('.ais-Hits-item');

    products = await page.evaluate(nProducts => {
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
          shopImgURL: 'imag/pccomponentes',
          shopName: 'PcComponentes'
        };
      });
    }, nProducts);
  } catch (e) {
    console.log(e);
  }

  return products;
}

module.exports = scrapShop;
