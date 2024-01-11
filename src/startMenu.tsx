import React, { useState } from 'react';

interface StartMenuProps {
    onStart: (startNumber: number) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onStart }) => {
    const [startNumber, setStartNumber] = useState('');

    const handleStartNewLottery = () => {
        if (startNumber) {
            onStart(Number(startNumber));
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartNumber(event.target.value);
    };

    const handleCloseApp = () => {
        window.close(); // In Electron, consider using ipcRenderer to send a message to the main process to close the window
    };

    return (
        <div className="menu">
            <div className="menu-content">
                <h1 className="menu-title">Lottery</h1>
                <div className="menu-input">
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={startNumber}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                    <button
                        onClick={handleStartNewLottery}
                        disabled={!startNumber}
                        className="menu-button"
                    >
                        Start
                    </button>
                </div>
                <button
                    onClick={handleCloseApp}
                    className="menu-button close-btn"
                >
                    Close application
                </button>
            </div>
        </div>
    );
};

export default StartMenu;
