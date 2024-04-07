import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { hitMonster } from '../features/fight/fightSlice.js';
import { hitBack } from "../features/fight/fightSlice.js";


const ButtonCapacity = props => {
    const dispatch = useDispatch();
     const combat = () => {
        dispatch(hitMonster(400));
        dispatch(hitBack({id: props.player.id, damage: 5}));
    }
        return (
            <button type="button" onClick={() => combat()} className="btn btn-success material-tooltip-main ">
                hit
            <i className="fas fa-bomb"></i> 5
        <i className="fas fa-fire-alt"></i> - 5
    </button>
        )

}



export default ButtonCapacity;
