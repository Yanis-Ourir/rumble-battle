import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkPlayerTurn, hitMonster} from '../features/fight/fightSlice.js';
import { hitBack } from "../features/fight/fightSlice.js";
import { updatePlayerTurn } from "../features/fight/fightSlice.js";
import { GiCrocSword } from "react-icons/gi";
import { IoWater } from "react-icons/io5";


const ButtonCapacity = props => {
    const dispatch = useDispatch();
     const combat = () => {
        dispatch(hitMonster({damage: 400, id: props.player.id}));
        dispatch(hitBack({id: props.player.id, damage: 5}));
        dispatch(updatePlayerTurn());
    }
        return (
            props.player.played ? (
                    <button type="button" onClick={() => combat()} disabled={true} className="btn btn-success material-tooltip-main ">
                        <div>
                            <div className="d-flex justify-content-center align-items-center">
                                <>Normal Attack</>
                                <div>
                                    <> 5</>

                                    <GiCrocSword/>
                                    <> - 0</>
                                    <IoWater/>
                                </div>
                            </div>
                        </div>
                    </button>
            ) : (
                <button type="button" onClick={() => combat()} className="btn btn-success material-tooltip-main">
                    <div>
                        <div className="d-flex justify-content-center align-items-center">
                            <>Normal Attack</>
                            <div>
                                <> 5</>

                                <GiCrocSword/>
                                <> - 0</>
                                    <IoWater/>
                                </div>
                            </div>
                        </div>
                    </button>
            )
        )

}


export default ButtonCapacity;
