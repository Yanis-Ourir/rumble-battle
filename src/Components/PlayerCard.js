import React from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';
import {useSelector} from "react-redux";



const PlayerCard = props => {
        return (
            <div key={props.player.id} className="col-sm-3 card center" id={`joueur${props.player.id}`}>

                <div className="card-body text-center ff7">
                    <h5 className="card-title">{props.player.name}</h5>
                    <img src={props.player.image} className="img-fluid" alt={props.player.name} />
                    <ProgressBar pv={props.player.pv} pvMax={props.player.pvMax} faType='fa-heart' barName=' : pv ' bgType='bg-danger'/>
                    <ProgressBar pv={props.player.mana} pvMax={props.player.manaMax} faType='fa-fire-alt' barName=' : mana ' />

                    <span className="badge badge-danger ml-2 " id="degatSpanJ1"></span>
                    <div className="row ">
                        <div>
                            <ButtonCapacity player={props.player} capacity={props.player.capacities[0]}/>
                            <ButtonCapacity player={props.player} capacity={props.player.capacities[1]}/>
                            <ButtonCapacity player={props.player} capacity={props.player.capacities[2]}/>
                            <ButtonCapacity player={props.player} capacity={props.player.capacities[3]}/>
                        </div>
                    </div >
                </div >

            </div >
        )
}


export default PlayerCard;
