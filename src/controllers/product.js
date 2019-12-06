const pccomponentes = require('../scrapers/pccomponentes');

const scrapers = {
    pccomponentes: new pccomponentes()
};

async function search(req, res) {

    //TODO: esto es el argumento de una funcion, que llamara a los scrappers necesarios
    const searchParams = {
        term: req.params.term,
        shops: ['pccomponentes'], //ID tienda (un identificador que acordemos)
    };

    /**
     * Perform the search on the specified shops
     * @param {number[]} shops array of shop IDs
     */
    async function getProducts(shops) {
        let products = [], scrappedProds = [];

        //shops.forEach(async shopId => {
            try {
                scrappedProds = await scrapers['pccomponentes']
                    .getProducts(searchParams.term);

                    //console.log({scrappedProds, type: typeof scrappedProds});
                    
            } catch(e) {
                console.error(e);
            }

            products = [...products, ...scrappedProds]; //TODO: test this: product.push(...scrappedProds);
        //});

        return products;
    }

    let product = []

    try {   
        products = await getProducts(searchParams.shops);
    } catch(e) {
        console.error(e);
    }

    const response = {
        resp: {
            products, //TODO aqui iran los "new Product()" generados por el scrapper
        },
        msg: 'Todo en orden, puede reanudar la marcha'
    };

    console.log('term', searchParams.term);
    
    //TODO: call scrapper with term

    return res.status(200).send(response);
}

module.exports = {
    search
};