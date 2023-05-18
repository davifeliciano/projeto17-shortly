import pool from "../database/pool.js";
import camelCaseRows from "./utils/camelCaseRows.js";

class UrlsRepository {
  static async findById(id) {
    const query = `
      SELECT
        id,
        short_url,
        url
      FROM urls
      WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) return null;

    return camelCaseRows(rows)[0];
  }

  static async insert(userId, url, shortUrl) {
    const query = `
      INSERT INTO urls
        (user_id, url, short_url)
      VALUES
        ($1, $2, $3)
      RETURNING
        id, short_url;
    `;

    const params = [userId, url, shortUrl];
    const { rows } = await pool.query(query, params);

    return camelCaseRows(rows)[0];
  }

  static async visitUrl(shortUrl) {
    const query = `
      UPDATE urls
      SET
        visit_count = visit_count + 1
      WHERE
        short_url = $1
      RETURNING url;
    `;

    const { rows } = await pool.query(query, [shortUrl]);

    if (rows.length === 0) return null;

    return rows[0].url;
  }
}

export default UrlsRepository;
