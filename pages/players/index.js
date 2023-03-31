import PlayerItem from "@/components/player";
import { useEffect, useState } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [playerName, setPlayerName] = useState("");
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const getPlayers = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch("/api/players");
        if (!res.ok) throw new Error("Players data not found..!");

        const data = await res.json();
        setPlayers(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    getPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //creating a playerObj
    const playerObj = {
      id: Date.now(),
      name: playerName,
      country: countryName,
    };

    //post request
    const res = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });

    const data = await res.json();

    //if response is false
    if (!res.ok) {
      console.log("fail to fetch data");
    }

    //if response is true
    if (res.ok) {
      console.log("success", data);
      setPlayers([...players, data]);
    }
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Add a new player</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter a player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter a country name"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <button type="submit">Add Player</button>
      </form>

      <h1>List of Player</h1>
      {players?.map((player) => (
        <PlayerItem key={player.id} player={player} />
        // <div key={player.id}>
        //   <h2>{player.name}</h2>
        //   <h2>{player.country}</h2>
        // </div>
      ))}
    </div>
  );
};

export default Players;
