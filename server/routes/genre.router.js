const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Get all genres for use in Add Movie dropdown
  const query = `SELECT * FROM genres ORDER BY "id" ASC;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('error getting genres', err);
      res.sendStatus(500)
    })
});

module.exports = router;