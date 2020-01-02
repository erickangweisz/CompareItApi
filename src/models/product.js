class Product {
  /**
   * Product base class
   * @param {string} name
   * @param {number} price
   * @param {string} url
   * @param {string} image
  */
  
  constructor(name, price, url, image) {
    this.name = name;
    this.price = price;
    this.url = url;
    this.image = image;
  }
}

module.exports = Product;
