class SearchParams {
    /**
     * SearchParams
     * @param {string} term
     * @param {string{}} shops
     * @param {number} nProductsPerShop
     */
    constructor(term, shops, nProductsPerShop) {
      this.term = term;
      this.shops = shops;
      this.nProductsPerShop = nProductsPerShop;
    }
  }
  
  module.exports = SearchParams;
  