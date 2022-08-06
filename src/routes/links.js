const express = require('express');
const router = express.Router();
const pool = require('../database');

/* link: localhost/list/add */
router.get('/add', (req, res) => {
    res.render('links/add');
});

/* function asincrono: async - await */
router.post('/add', async (req, res) => {
    //  Obtiene las propueades del link/add
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };

    //  console.log(newLink);
    await pool.query('INSERT INTO links SET ?', [newLink]);
    //  res.send('received');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    //  console.log(req.params.id);
    //  res.send('Deleted');
    const { id } = req.params;

    pool.query('DELETE FROM links WHERE idlink = ?', [id]);

    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    
    const links = await pool.query('SELECT * FROM links WHERE idlink = ?', [id]);
    //  console.log(links[0]);

    res.render('links/edit', { link:links[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;   //  Datos que envia el form

    const newLink = {
        title,
        url,
        description
    }

    pool.query('UPDATE links SET ? WHERE idlink = ?', [ newLink, id ]);
    res.redirect('/links');
});

module.exports = router;