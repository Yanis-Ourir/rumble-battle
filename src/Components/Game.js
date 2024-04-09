import React from 'react';
import './Game.css';
import Monster from './Monster';
import PlayerList from './PlayerList';

const App = () => (
    <div className="App">
        <h1>Final Fantasy Fight</h1>
        <Monster />
        <br></br>
        <section className="container-fluid">
            <PlayerList />
        </section>
    </div>
)

export default App;
