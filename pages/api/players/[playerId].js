import { players } from "@/data/players";

export default function handler(req, res) {
  const { playerId } = req.query;

  if (req.method === "GET") {
    const player = players.find((player) => player.id === +playerId);
    if (player) {
      res.status(200).json(player);
    }
    if (!player) {
      res.status(404).json({ error: "Player Not Found" });
    }
  }

  if (req.method === "DELETE") {
    const playerIndex = players.findIndex((player) => player.id === +playerId);
    players.splice(playerIndex, 1);
    res.status(200).json({ message: "Player deleted" });
  }
}
