const PlayerItem = ({ player }) => {
  return (
    <div>
      <h3>
        Name: {player.name} -- Country: {player.country}
      </h3>
    </div>
  );
};

export default PlayerItem;
