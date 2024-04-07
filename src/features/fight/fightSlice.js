import { createSlice } from "@reduxjs/toolkit";
import Cloud from '../../assets/Cloud.gif';
import Tidus from '../../assets/tidus.gif';
import Terra from '../../assets/Terra.gif';
import Squall from '../../assets/Squall.gif';


const initialState = {
    // TODO : Compléter 'players' et 'monster'
    players: [
        {
            name: "Cloud",
            image: Cloud,
            pv: 100,
            pvMax: 100,
            mana: 30,
            manaMax: 30,
            id: 1,
        },
        {
            name: "Tidus",
            image: Tidus,
            pv: 100,
            pvMax: 100,
            mana: 30,
            manaMax: 30,
            id: 2,
        },
        {
            name: "Squall",
            image: Squall,
            pv: 100,
            pvMax: 100,
            mana: 30,
            manaMax: 30,
            id: 3,
        },
        {
            name: "Terra",
            image: Terra,
            pv: 100,
            pvMax: 100,
            mana: 30,
            manaMax: 30,
            id: 4,
        },

    ],
    monster: {
        name: "Sephiroth", // here
        pv: 1000,
        pvMax: 1000,
        image: "https://mooglestorage.blob.core.windows.net/images/2cee8fdf-f908-46c9-83d1-4b8b79ca642d.jpg",
        apiSlug: "sephiroth",
    },
};


export const fightSlice = createSlice({
    name: "fight",
    initialState,
    reducers: {
        hitMonster: (state, action) => {
            state.monster.pv -= action.payload;
        },
        hitBack: (state, action) => {
            const player = state.players.find(player => player.id === action.payload.id);
            player.pv -= action.payload.damage;
        },
        updateMonster: (state, action) => {
            state.monster.name = action.payload.name;
            state.monster.image = action.payload.image;
            state.monster.apiSlug = action.payload.apiSlug;
            state.monster.pv = state.monster.pvMax;
        }
    },
});

export default fightSlice.reducer;
export const { hitMonster, hitBack, updateMonster } = fightSlice.actions;
