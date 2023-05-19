import { nanoid } from "nanoid";
import UrlsRepository from "../repositories/urls.repository.js";
import { MAX_URL_SIZE, MIN_URL_SIZE } from "../constants/urls.constants.js";

export async function createShortUrl(
  userId,
  url,
  shortUrl = nanoid(MIN_URL_SIZE)
) {
  const shortUrlSize = shortUrl.length;

  if (shortUrlSize < MIN_URL_SIZE || shortUrlSize > MAX_URL_SIZE) {
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
