import { movies } from "@/data/movies";

export default function handler(req, res) {
  res.status(200).json(movies);
}
