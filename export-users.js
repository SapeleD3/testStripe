require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const userExport = async (requestBody) => {
  const {} = requestBody;
  const config = {
    host: 'localhost',
    user: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
    database: 'strapi',
  };

  const pool = new Pool(config);
  const client = await pool.connect();

  try {
    const { rows: response } = await client.query(`
        SELECT * FROM public.up_users
        WHERE id = 2
    `);
    const password = response[0].password;

    /**
     * Validate a password
     * @param {string} password
     * @param {string} hash
     * @returns {boolean} is the password valid
     */
    const validatePassword = await bcrypt.hash('playPassword', 10);

    // update the strapi user with our password or straightup create a new user
    const { rows: response2 } = await client.query(`
        UPDATE up_users
        SET password = '${validatePassword}'
        WHERE id = 2;
    `);
    console.log('validatePassword', { new: validatePassword, old: password });
    console.log('update-response', response2);

    client.release(true);
    return response;
  } catch (error) {
    console.log('error exporting user', error);
    client.release(true);
  }
};

module.exports = userExport;
