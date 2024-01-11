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

    const rows: Item[][] = [];
    for (let i = 0; i < numRows; i++) {
        const rowItems = items.slice(i * numCols, (i + 1) * numCols);
        rows.push(rowItems);
    }

    return (
        <div className="lottery">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((item, colIndex) => (
                        <div
                            key={colIndex}
                            className={`item ${item.status === 'picked' ? 'picked' : ''}`}
                        >
                            {item.value}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Lottery;
