import { nanoid } from "nanoid";
import UrlsRepository from "../repositories/urls.repository.js";

const minUrlSize = 8;
const maxUrlSize = 12;

export async function createShortUrl(
  userId,
  url,
  shortUrl = nanoid(minUrlSize)
) {
  const shortUrlSize = shortUrl.length;

  if (shortUrlSize < minUrlSize || shortUrlSize > maxUrlSize) {
    throw new Error("Could not generate a unique short_url");
  }

  try {
    return await UrlsRepository.insert(userId, url, shortUrl);
  } catch (err) {
    if (err.constraint === "urls_short_url_key") {
      return await createShortUrl(userId, url, nanoid(shortUrlSize + 1));
    }

    throw err;
  }
}
