import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const limitedTrades = trades.slice(-10);

  return (
    <Box
      sx={{
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f9f9f9',
        boxShadow: theme.palette.mode === 'dark' ? '0px 4px 10px rgba(0, 0, 0, 0.8)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '8px',
          backgroundColor: theme.palette.mode === 'dark' ? '#2b2b2b' : theme.palette.background.paper,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : theme.palette.background.default,
                  padding: '16px',
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
                >
                  Statement List
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {limitedTrades.slice().reverse().map((trade, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.mode === 'dark'
                        ? '#242424'
                        : theme.palette.action.hover
                      : theme.palette.background.default,
                }}
              >
                <TableCell
                  sx={{
                    padding: '12px 16px',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      color: theme.palette.text.primary,
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightProfitLoss(trade) }}
                  ></Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TradeList;
