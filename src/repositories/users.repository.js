import pool from "../database/pool.js";
import camelCaseRows from "./utils/camelCaseRows.js";

class UsersRepository {
  static async findByEmail(email) {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1;
    `;

    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) return null;

    return camelCaseRows(rows)[0];
  }

  static async insert(name, email, passwordHash) {
    const query = `
      INSERT INTO users
        (name, email, password_hash)
      VALUES
        ($1, $2, $3);
    `;

    const params = [name, email, passwordHash];
    const { rowCount } = await pool.query(query, params);

    return rowCount;
  }
}

export default UsersRepository;
