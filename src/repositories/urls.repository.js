import pool from "../database/pool.js";
import camelCaseRows from "./utils/camelCaseRows.js";

class UrlsRepository {
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
}

export default UrlsRepository;
