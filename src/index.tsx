import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import StartMenu from './startmenu/startMenu';
import Lottery, { Item } from './lottery/lottery';
import './index.scss';
import './tailwind.output.css';


const App = () => {

    const [lotteryItems, setlotteryItems] = useState<Item[]>();

    const renderLottery = (): JSX.Element => {
        return lotteryItems !== undefined ? <Lottery items={lotteryItems} />
            : <StartMenu onStart={setlotteryItems} />;
    };

    return (
        <div>
            {renderLottery()}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));