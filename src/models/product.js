class Product {
  /**
   * Product base class
   * @param {string} name
   * @param {number} price
   * @param {string} url
   */
  constructor(name, price, url) {
    this.name = name;
    this.price = price;
    this.url = url;
  }
}

module.exports = Product;
