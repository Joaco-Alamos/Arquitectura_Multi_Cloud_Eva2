const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: '172.31.44.220',
  database: 'postgres',
  password: 'password_simi_2026',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.send(`
      <body style="font-family: Arial; background: #f4f4f4; text-align: center; padding: 50px;">
        <div style="background: white; display: inline-block; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h1 style="color: #2c3e50;">SIMI ERP - Prototipo Funcional</h1>
          <hr>
          <pre style="text-align: left; background: #eee; padding: 15px;">${JSON.stringify(result.rows, null, 2)}</pre>
        </div>
      </body>
    `);
  } catch (err) {
    res.status(500).send("Error de conexión: " + err.message);
  }
});

app.listen(3000, () => console.log('Servidor listo en puerto 3000'));
