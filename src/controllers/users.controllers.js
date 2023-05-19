import UsersRepository from "../repositories/users.repository.js";

export async function getStatsController(req, res) {
  const { user } = res.locals;

  try {
    const stats = await UsersRepository.getStats(user.id);
    return res.send(stats);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function getRankingController(req, res) {
  try {
    const ranking = await UsersRepository.getRanking();
    return res.send(ranking);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
