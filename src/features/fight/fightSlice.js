import { createSlice } from "@reduxjs/toolkit";
import Cloud from '../../assets/Cloud.gif';
import Tidus from '../../assets/tidus.gif';
import Terra from '../../assets/Terra.gif';
import Squall from '../../assets/Squall.gif';
import CloudAttack from '../../assets/Cloud_attack.gif';
import TidusAttack from '../../assets/Tidus_attack.gif';
import TerraAttack from '../../assets/Terra_attack.gif';
import SquallAttack from '../../assets/Squall_attack.gif';

const initialState = {
    players: [
        {
            name: "Cloud",
            image: Cloud,
            pv: 100,
            pvMax: 100,
            mana: 30,
            manaMax: 30,
            played: false,
            id: 1,
            capacities: [
                {
                    name: "Attack",
                    damage: 30,
                    manaCost: 0,
                    manaGain: 5,
                },
                {
                    name: "Pierce Thrust",
                    damage: 50,
                    manaCost: 10,
                    manaGain: 0,
                },
                {
                    name: "Triple Slash",
                    damage: 100,
                    manaCost: 15,
                    manaGain: 0,
                },
                {
                    name: "Omnislash",
                    damage: 250,
                    manaCost: 30,
                    manaGain: 0,
                },
            ]
        },
        {
            name: "Tidus",
            image: Tidus,
            pv: 300,
            pvMax: 300,
            mana: 30,
            manaMax: 30,
            played: false,
            id: 2,
            capacities: [
                {
                    name: "Attack",
                    damage: 20,
                    manaCost: 0,
                    manaGain: 5,
                },
                {
                    name: "Spiral Cut",
                    damage: 30,
                    manaCost: 10,
                    manaGain: 0,
                    healthGain: 30
                },
                {
                    name: "Energy Rain",
                    damage: 50,
                    manaCost: 15,
                    healthGain: 100,
                    manaGain: 0,
                },
                {
                    name: "Blitz Ace",
                    damage: 100,
                    healthGain: 200,
                    manaCost: 30,
                    manaGain: 0,
                },
            ]
        },
        {
            name: "Squall",
            image: Squall,
            pv: 120,
            pvMax: 120,
            mana: 30,
            manaMax: 30,
            played: false,
            id: 3,
            capacities: [
                {
                    name: "Attack",
                    damage: 20,
                    manaCost: 0,
                    manaGain: 5,
                },
                {
                    name: "Renzokuken",
                    damage: 50,
                    manaCost: 10,
                    manaGain: 0,
                },
                {
                    name: "Blasting Zone",
                    damage: 100,
                    manaCost: 15,
                    manaGain: 0,
                },
                {
                    name: "Lion Heart",
                    damage: 250,
                    manaCost: 30,
                    manaGain: 0,
                },
            ]
        },
        {
            name: "Terra",
            image: Terra,
            pv: 80,
            pvMax: 80,
            mana: 50,
            manaMax: 50,
            played: false,
            id: 4,
            capacities: [
                {
                    name: "Attack",
                    damage: 10,
                    manaCost: 0,
                    manaGain: 10,
                },
                {
                    name: "Fire",
                    damage: 50,
                    manaCost: 10,
                    manaGain: 0,
                },
                {
                    name: "Max Heal",
                    damage: 0,
                    manaCost: 25,
                    manaGain: 0,
                    healthGain: 100
                },
                {
                    name: "Ultima",
                    damage: 400,
                    manaCost: 50,
                    manaGain: 15
                },
            ]
        },

    ],
    monster: {
        name: "Sephiroth", // here
        pv: 1000,
        pvMax: 1000,
        image: "https://mooglestorage.blob.core.windows.net/images/2cee8fdf-f908-46c9-83d1-4b8b79ca642d.jpg",
        apiSlug: "sephiroth",
        origin: "Final Fantasy VII"
    },
    bossKilledNumber: 0,
};

const attackImages = {
    Cloud: CloudAttack,
    Tidus: TidusAttack,
    Terra: TerraAttack,
    Squall: SquallAttack,
};

const baseImages = {
    Cloud: Cloud,
    Tidus: Tidus,
    Terra: Terra,
    Squall: Squall,
};
export const fightSlice = createSlice({
    name: "fight",
    initialState,
    reducers: {
        hitMonster: (state, action) => {
            state.monster.pv -= action.payload.damage;
            const player = state.players.find(player => player.id === action.payload.id);
            player.played = true;
            player.mana -= action.payload.manaDecrease;

            if(player.mana < player.manaMax) {
                player.mana += action.payload.manaGain;
                if (player.mana > player.manaMax) {
                    player.mana = player.manaMax;
                }
            }

            if(action.payload.healthGain) {
                    player.pv += action.payload.healthGain;
                if(player.pv > player.pvMax) {
                    player.pv = player.pvMax;
                }
            }

            if(action.payload.capacityName === "Max Heal"){
                state.players.map(player => {
                    player.pv = player.pvMax;
                });
            }

            if(state.monster.pv <= 0){
                state.monster.pv = 0;
                state.bossKilledNumber += 1;
            }
        },
        hitBack: (state, action) => {
            const player = state.players.find(player => player.id === action.payload.id);
            player.pv -= action.payload.damage;
            player.image = attackImages[player.name];
            if(player.pv <= 0){
                player.pv = 0;
                player.played = true;
            }
        },
        updateMonster: (state, action) => {
            state.monster.name = action.payload.name;
            state.monster.image = action.payload.image;
            state.monster.apiSlug = action.payload.apiSlug;
            state.monster.pv = state.monster.pvMax;
            state.monster.origin = action.payload.origin;
        },
        updatePlayerTurn: (state) => {
            const alivePlayers = state.players.filter(player => player.pv > 0);
            if (alivePlayers.every(player => player.played)) {
                state.players.map(player => {
                    player.played = false;
                });
            }
            if(state.monster.pv <= 0){
                state.players.map(player => {
                    player.played = true;
                });
            }
        },
        changePlayerImage: (state, action) => {
            const player = state.players.find(player => player.id === action.payload.id);
            player.image = baseImages[player.name];
        }
    },
});

export default fightSlice.reducer;
export const {
    hitMonster,
    hitBack,
    updateMonster,
    updatePlayerTurn,
    checkPlayerTurn,
    changePlayerImage
} = fightSlice.actions;
