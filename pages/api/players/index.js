import { players } from "@/data/players";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(players);
  }

  if (req.method === "POST") {
    const playerObj = req.body;
    players.push(playerObj);

    res.status(200).json(playerObj);
  }
}
