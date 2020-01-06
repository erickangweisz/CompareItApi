class Product {
  /**
   * Product base class
   * @param {string} name
   * @param {number} price
   * @param {string} url
   * @param {string} image
   * @param {string} shopname
  */
  
  constructor(name, price, url, image, shopname) {
    this.name = name;
    this.price = price;
    this.url = url;
    this.image = image;
    this.shopname = shopname;
  }
}

module.exports = Product;
