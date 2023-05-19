import UrlsRepository from "../repositories/urls.repository.js";
import { createShortUrl } from "../services/urls.services.js";

export async function findByIdController(req, res) {
  const { id } = res.locals;

  try {
    const urlsAndId = await UrlsRepository.findById(id);
    return urlsAndId !== null ? res.send(urlsAndId) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function postController(req, res) {
  const { user } = res.locals;
  const { url } = res.locals.body;

  try {
    const shortUrlAndId = await createShortUrl(user.id, url);
    return res.status(201).send(shortUrlAndId);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function deleteController(req, res) {
  const { id, user } = res.locals;

  try {
    const deletedCount = await UrlsRepository.delete(id, user.id);

    if (deletedCount !== 0) return res.sendStatus(204);

    const urlsAndId = UrlsRepository.findById(id);
    return urlsAndId !== null ? res.sendStatus(401) : res.sendStatus(404);
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
