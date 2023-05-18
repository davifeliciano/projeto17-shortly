import { createShortUrl } from "../services/urls.services.js";

export async function PostController(req, res) {
  const { id: userId } = res.locals.user;
  const { url } = res.locals.body;

  try {
    const shortUrl = await createShortUrl(userId, url);
    return res.status(201).send(shortUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
