import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { hitMonster, updatePlayerTurn, changePlayerImage} from '../features/fight/fightSlice.js';
import { hitBack } from "../features/fight/fightSlice.js";
import { GiCrocSword } from "react-icons/gi";
import { IoWater } from "react-icons/io5";


const ButtonCapacity = props => {
    const dispatch = useDispatch();
     const combat = () => {
         dispatch(hitBack({
             id: props.player.id,
             damage: Math.floor(Math.random() * 30 + 10)
         }));

        dispatch(hitMonster({
            damage: props.capacity.damage,
            id: props.player.id,
            healthGain: props.capacity.healthGain,
            manaGain: props.capacity.manaGain,
            manaDecrease: props.capacity.manaCost,
            capacityName: props.capacity.name
        }));



        dispatch(updatePlayerTurn());

        setTimeout(() => {
            dispatch(changePlayerImage({id: props.player.id}));
        }, 800);
    }
        return (
            <button
                type="button"
                onClick={() => combat()}
                disabled={props.player.played || props.player.pv <= 0 || props.capacity.manaCost > props.player.mana}
            >
                <div>
                    <div className="d-flex justify-content-center align-items-center">
                        <>{props.capacity.name}</>
                        <div>
                            <> {props.capacity.damage}</>

                            <GiCrocSword/>
                            <> - {props.capacity.manaCost}</>
                            <IoWater/>
                        </div>
                    </div>
                </div>
            </button>

)

}


export default ButtonCapacity;
