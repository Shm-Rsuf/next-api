const PlayerItem = ({ player, handleDelete }) => {
  return (
    <div>
      <h3>
        Name: {player.name} -- Country: {player.country}
      </h3>
      <button onClick={() => handleDelete(player.id)}>delete</button>
      <hr />
    </div>
  );
};

export default PlayerItem;
