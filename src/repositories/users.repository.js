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

  static async getStats(id) {
    const query = `
      SELECT
        id,
        name,
        (
          SELECT sum(visit_count)
          FROM urls
          WHERE user_id = $1
        ) AS "visitCount",
        (
          SELECT json_agg(t)
          FROM (
            SELECT
              id,
              short_url AS "shortUrl",
              url,
              visit_count AS "visitCount"
            FROM urls
            WHERE user_id = $1
          ) AS t
        ) AS "shortenedUrls"
      FROM users
      WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) return null;

    return rows[0];
  }
}

export default UsersRepository;
