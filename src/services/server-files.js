const express = require('express');
const path = require('path');

const app = express();

/* PcComponentes */
app.get('/api/imag/pccomponentes', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/pccomponentes/imagotipo.png'));
});
app.get('/api/logo/pccomponentes', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/pccomponentes/logotipo.png'));
});

/* Amazon */
app.get('/api/imag/amazon', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/amazon/imagotipo.png'));
});
app.get('/api/logo/amazon', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/amazon/logotipo.png'));
});

/* AliExpress */
app.get('/api/imag/aliexpress', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/aliexpress/imagotipo.png'));
});
app.get('/api/logo/aliexpress', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/aliexpress/logotipo.png'));
});

module.exports = app;