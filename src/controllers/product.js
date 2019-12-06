function search(req, res) {
    const term = req.params.term;
    const response = {
        products: [],
        status: 0,
        error: false,
        msg: 'Todo en orden, puede reanudar la marcha'
    };

    console.log('term', term);
    
    //TODO: call scrapper with term

    return res.status(200).send(response);
}

module.exports = {
    search
};