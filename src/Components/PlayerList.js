import React from 'react';
import PlayerCard from './PlayerCard';
import {useSelector} from "react-redux";


const PlayerList = () => {
  const players = useSelector(state => state.fight.players);
  return  <div className='player-list'>
    {players.map(player => (
      <PlayerCard key={player.id} player={player}/>
      ))
    }
  </div>
}

export default PlayerList;
