
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, Collapse, Button,  } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const getProfitLossNumberColor = (number) => {
  return parseFloat(number.replace(/₹|,/g, '')) < 0 ? 'red' : 'green';
};

const highlightProfitLoss = (text) => {
  return text.replace(/Profit\/Loss: ₹?(-?\d+(,\d{3})*(\.\d{1,2})?)/g, (match, p1) => {
    const color = getProfitLossNumberColor(p1);
    return `Profit/Loss: <span style="color:${color}">₹${p1}</span>`;
  }).replace(/(Sold|Bought) (CE|PE) at ₹?(-?\d+(,\d{3})*(\.\d{1,2})?)/g, (match, action, option, price) => {
    return `${action} ${option} at <span style="color: grey;font-weight: 600;">₹${price}</span>`;
  });
};

const TradeList = ({ trades }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
        >
          Statement List
        </Typography>
        <IconButton onClick={handleToggle}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '8px',
            backgroundColor: theme.palette.mode === 'dark' ? '#2b2b2b' : theme.palette.background.paper,
          }}
        >
          <Table>
            <TableBody>
              {trades
                .slice(-visibleCount)
                .reverse()
                .map((trade, index) => (
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
                    <TableCell sx={{ padding: '12px 16px' }}>
                      <Typography
                        variant="body1"
                        sx={{ whiteSpace: 'pre-wrap', color: theme.palette.text.primary }}
                        dangerouslySetInnerHTML={{ __html: highlightProfitLoss(trade) }}
                      ></Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {visibleCount < trades.length && (
          <Box textAlign="center" mt={2}>
            <Button variant="contained" onClick={handleShowMore}>
              Show More
            </Button>
          </Box>
        )}
      </Collapse>
    </Box>
  );
};


export default TradeList;
