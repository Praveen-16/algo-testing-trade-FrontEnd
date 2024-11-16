import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const getProfitLossNumberColor = (number) => {
  return parseFloat(number) < 0 ? 'red' : 'green';
};

const highlightProfitLoss = (text) => {
  return text.replace(/Profit\/Loss: (-?\d+(\.\d{1,2})?)/g, (match, p1) => {
    const color = getProfitLossNumberColor(p1);
    return `Profit/Loss: <span style="color:${color}">${p1}</span>`;
  });
};

const TradeList = ({ trades }) => {
  const limitedTrades = trades.slice(-10);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Statement List</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {limitedTrades.slice().reverse().map((trade, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
              <TableCell>
                <Typography 
                  variant="body1" 
                  style={{ whiteSpace: 'pre-wrap' }}
                  dangerouslySetInnerHTML={{ __html: highlightProfitLoss(trade) }}
                >
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradeList;
