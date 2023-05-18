import UrlsRepository from "../repositories/urls.repository.js";
import { createShortUrl } from "../services/urls.services.js";

export async function postController(req, res) {
  const { id: userId } = res.locals.user;
  const { url } = res.locals.body;

  try {
    const shortUrlAndId = await createShortUrl(userId, url);
    return res.status(201).send(shortUrlAndId);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function openController(req, res) {
  const { shortUrl } = res.locals;

  try {
    const url = await UrlsRepository.visitUrl(shortUrl);
    return url !== null ? res.redirect(url) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
