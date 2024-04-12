import React from 'react';
import ProgressBar from './ProgressBar';
import {useDispatch, useSelector} from "react-redux";
import RandomMonster from "../functions/RandomMonster";
import { BiSolidSkull } from "react-icons/bi";


const Monster = () => {
  const dispatch = useDispatch();
  const monster = useSelector(state => state.fight.monster);
  const bossKilledNumber = useSelector(state => state.fight.bossKilledNumber);

  const monsters = ['sephiroth', 'kefka', 'seymour', 'ultimecia'];
  const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];


    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="ff7-monster col-sm-12">
              <div id="monsterCard">
                <div className="text-center">
                  <div className="row">
                    <div className="col-sm-2 offset-sm-3">
                      <span className="badge badge-danger ml-2 " id="degatSpanMonster"></span>
                      <h2 className="monster-name">{monster.name}</h2>
                      <img className="img-fluid" src={monster.image} alt='monster' />
                    <div>
                      {monster.origin}
                    </div>
                      {monster.pv > 0 && (
                          <button className="change-button" onClick={() => RandomMonster(dispatch, randomMonster)} disabled={true}>
                            <div>
                              Change Boss
                            </div>
                          </button>
                      )}
                      {monster.pv <= 0 && (
                          <button className="change-button" onClick={() => RandomMonster(dispatch, randomMonster)}>
                            <div>
                              Change Boss
                            </div>
                          </button>
                      )}
                    </div>
                  </div>
                </div>
                <ProgressBar pv={monster.pv} pvMax={monster.pvMax} bgType='bg-danger' faType='fa-heart' barName=' : pv ' />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <BiSolidSkull/>
          <div>
          Number of boss killed : {bossKilledNumber}
          </div>
        </div>
      </section>

    );
}

export default Monster;
