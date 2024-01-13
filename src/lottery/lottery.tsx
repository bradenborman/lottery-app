import React from 'react';

export interface Item {
    value: number;
    status: 'alive' | 'picked';
}

interface LotteryProps {
    items: Item[];
}

const Lottery: React.FC<LotteryProps> = ({ items }) => {
    const numRows = Math.ceil(Math.sqrt(items.length));
    const numCols = Math.ceil(items.length / numRows);

    const rowStyle: React.CSSProperties = {
        width: `calc(${100 / numCols}% - 8px)`,
        height: `calc(${100 / numRows}vh - 8px)`,
        margin: 3,
        lineHeight: `${100 / numRows}vh`,
        border: '1px solid black',
        fontSize: `calc(${100 / numRows}vh * 0.8)`,
        borderRadius: '10%'
    };

    return (
        <div className="lottery">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`item ${item.status === 'picked' ? 'picked' : ''}`}
                    style={rowStyle}
                >
                    {item.value}
                </div>
            ))}
        </div>
    );
};

export default Lottery;
