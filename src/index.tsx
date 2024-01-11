import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import StartMenu from './startMenu';
import Lottery from './lottery';
import './index.scss';
import './tailwind.output.css';


const App = () => {

    const [lotteryStartNumber, setLotteryStartNumber] = useState<number>();

    const renderLottery = (): JSX.Element => {

        return lotteryStartNumber !== undefined ? <Lottery startNumber={lotteryStartNumber} />
            : <StartMenu onStart={setLotteryStartNumber} />;
    };

    return (
        <div>
            {renderLottery()}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));