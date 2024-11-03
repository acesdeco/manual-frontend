/* eslint-disable react/prop-types */
import { useState } from 'react';

// Test data (this can come from props or a state for more flexibility)
const testTable = [
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I']
];

interface ResizableTableProps {
  rows: number;
  columns: number;
}

const ResizableTable: React.FC<ResizableTableProps> = ({ rows, columns }) => {
  // Initialize state for the table data (empty strings initially)
  const [tableData, setTableData] = useState(
    Array.from({ length: rows }, () => Array(columns).fill(''))
  );

  // Function to handle cell value changes
  const handleCellChange = (row: number, col: number, value: string) => {
    const newTableData = [...tableData];
    newTableData[row][col] = value;
    setTableData(newTableData);
  };

  // Calculate score based on testTable data
  const calculateScore = () => {
    let score = 0;
    let maxScore = rows * columns;
    
    tableData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (testTable[rowIndex] && testTable[rowIndex][colIndex] === cell) {
          score += 1;
        }
      });
    });
    return `${score} / ${maxScore}`;
  };

  return (
    <div>
      <h2>Resizable Table</h2>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid black', padding: '10px' }}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Score: {calculateScore()}</h3>
    </div>
  );
};


const App = () => {
    return (
      <div>
        <ResizableTable rows={3} columns={2} />
      </div>
    );
  };
  export default App;