const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: '172.31.44.220', // Tu IP privada actual
  database: 'postgres',
  password: 'password_simi_2026',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    
    // Generar las filas de la tabla dinámicamente
    const rows = result.rows.map(p => `
      <tr>
        <td>${p.id}</td>
        <td><strong>${p.nombre}</strong></td>
        <td>$${p.precio}</td>
        <td><span class="stock">${p.stock}</span></td>
      </tr>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>SIMI ERP - Control de Inventario</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #eef2f7; margin: 0; padding: 40px; display: flex; justify-content: center; }
          .container { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 800px; }
          h1 { color: #004a99; border-bottom: 3px solid #004a99; padding-bottom: 10px; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #004a99; color: white; padding: 12px; text-align: left; }
          td { padding: 12px; border-bottom: 1px solid #ddd; }
          tr:hover { background: #f9f9f9; }
          .stock { background: #d4edda; color: #155724; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
          .footer { margin-top: 20px; font-size: 0.8em; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>💊 SIMI ERP - Gestión de Inventario</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
          <div class="footer">Infraestructura Tier-2 desplegada en AWS con Docker</div>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Error de conexión: " + err.message);
  }
});

app.listen(3000, () => console.log('Servidor listo con estilo'));
