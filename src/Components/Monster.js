import React from 'react';
import ProgressBar from './ProgressBar';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {updateMonster} from "../features/fight/fightSlice";


const Monster = () => {
  const dispatch = useDispatch();

  const monster = useSelector(state => state.fight.monster);

  const monsters = ['sephiroth', 'kefka', 'seymour', 'ultimecia '];

  if(monster.pv <= 0){
      const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
  axios.request(`https://www.moogleapi.com/api/v1/characters/search?name=${randomMonster}`)
      .then(function (response) {
        const updatedMonster = {
          name: response.data[0].name,
          image: response.data[0].pictures[0].url,
        }

        dispatch(updateMonster({
          name: updatedMonster.name,
          image: updatedMonster.image,
        }));

        console.log(updatedMonster.name);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="card-monstre col-sm-12">
              <div id="monsterCard">
                <div className="text-center">
                  <div className="row">
                    <div className="col-sm-2 offset-sm-3">
                      <span className="badge badge-danger ml-2 " id="degatSpanMonster"></span>
                      <img className="img-fluid" src={monster.image} alt='monster' />
                      <h1 className="text-white">{monster.name}</h1>
                    </div>

                    <div id="comboOnMonster" className="col-sm-6">

                    </div>
                  </div>
                </div>
                <ProgressBar pv={monster.pv} pvMax={monster.pvMax} bgType='bg-danger' faType='fa-heart' barName=' : pv' />
              </div>
            </div>
          </div>
        </div>
      </section >
    );
}

export default Monster;
