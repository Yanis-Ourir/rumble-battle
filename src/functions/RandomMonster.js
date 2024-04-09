import axios from "axios";
import {updateMonster, updatePlayerTurn} from "../features/fight/fightSlice";


export default function RandomMonster(dispatch, randomMonster) {
    axios.request(`https://www.moogleapi.com/api/v1/characters/search?name=${randomMonster}`)
        .then(function (response) {
            dispatch(updateMonster({
                name: response.data[0].name,
                image: response.data[0].pictures[0].url,
                origin: response.data[0].origin,
            }));

            dispatch(updatePlayerTurn());
        })
        .catch(function (error) {
            console.log(error);
        });
}