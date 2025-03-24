import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { resetUserDetails, getUserStatus, toggleUserTrading } from "../services/api";

const UserDetails = ({ user }) => {
  const theme = useTheme();

  const detailStyle = {
    color: theme.palette.text.primary,
    fontSize: "16px",
    marginBottom: "8px",
  };

  const userDetailsStyle = {
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f7f7f7',
  };

  const boldTextStyle = {
    fontWeight: "bold",
    color: theme.palette.text.primary,
  };

  const [userStatus, setUserStatus] = useState(null);
  const [tradingState, setTradingState] = useState(user.data.doTrade);
  const peValues = user.data.peValues.slice(-5);
  const ceValues = user.data.ceValues.slice(-5);

  const handleGetStatus = async () => {
    try {
      const userName = user.data.name;
      const response = await getUserStatus(userName);
      setUserStatus(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  };

  const handleResetClick = async () => {
    try {
      const userName = user.data.name;
      const response = await resetUserDetails(userName);
      alert(response.data.messaage);
    } catch (error) {
      console.error("Error resetting user details:", error);
    }
  };


  const handleToggleTrading = async () => {
    try {

      window.location.reload();
      const userName = user.data.name;
      const newStatus = !tradingState;
      console.log(userName, newStatus);
      await toggleUserTrading(userName, newStatus);
      setTradingState(newStatus);
    } catch (error) {
      console.error("Error toggling trading status:", error);
    }
  };

  return (
    <Card className="user-details-card user-details" style={userDetailsStyle}>
      <CardContent className="user-details-content">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">User Details</Typography>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  marginBottom: 1,
                  borderRadius: "50%",
                  backgroundColor: user.data.doTrade ? "green" : "red",
                  marginLeft: 1,
                }}
              />
            </Box>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to reset user details?")
                ) {
                  handleResetClick();
                }
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGetStatus}
              sx={{ marginLeft: 2 }}
            >
              Show Status
            </Button>
          </Grid>
          {user.data.name === "realUser5" && (
            <Grid>
              <Button
                variant="contained"
                style={{
                  backgroundColor: tradingState ? "red" : "green",
                  color: "white",
                }}
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to ${
                        tradingState ? "turn off" : "turn on"
                      } trading?`
                    )
                  ) {
                    handleToggleTrading();
                  }
                }}
              >
                {tradingState ? "Turn Off" : "Turn On"}
              </Button>
            </Grid>
          )}
        </Grid>

        <div>
          <div style={detailStyle}>
            <span style={boldTextStyle}>Name:</span> {user.data.name}
          </div>
          <div style={detailStyle}>
            <span style={boldTextStyle}>Capital:</span>{" "}
            {user.data.capital.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </div>
          <div style={detailStyle}>
            <span style={boldTextStyle}>Available Balance:</span>{" "}
            {user.data.availableBalance.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </div>
          <div style={detailStyle}>
            <span style={boldTextStyle}>Net Profit/Loss:</span>{" "}
            {user.data.netProfitOrLoss.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </div>
          <div style={detailStyle}>
            <span style={boldTextStyle}>Total Trades:</span>{" "}
            {user.data.totalTrades} (
            <span style={{ color: "green" }}>
              +{user.data.totalPositiveTrades}
            </span>
            ,
            <span style={{ color: "red" }}>
              -{user.data.totalNegativeTrades}
            </span>
            )
          </div>
          <div style={detailStyle}>
            <span style={boldTextStyle}>Today Trades:</span>{" "}
            {user.data.todayTradesCount} (
            <span style={{ color: "green" }}>
              +{user.data.todayPositiveTrades}
            </span>
            ,
            <span style={{ color: "red" }}>
              -{user.data.todayNegativeTrades}
            </span>
            )
          </div>
          <div style={detailStyle}>
            <span style={boldTextStyle}>Unsettled Funds:</span>{" "}
            {user.data.unsettledFunds}
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                fontSize: "16px",
              }}
            >
             Last CE Value :
            </div>
            <List dense>
              {ceValues.length > 0 ? (
                ceValues.slice(-1).map((ce, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Value: ${ce.value.toFixed(2)}`}
                      secondary={`Time: ${new Date(ce.time).toLocaleString()}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No CE values available</Typography>
              )}
            </List>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                fontSize: "16px",
              }}
            >
              Last PE Value :
            </div>
            <List dense>
              {peValues.length > 0 ? (
                peValues.slice(-1).map((pe, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Value: ${pe.value.toFixed(2)}`}
                      secondary={`Time: ${new Date(pe.time).toLocaleString()}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No PE values available</Typography>
              )}
            </List>
          </Grid>
        </Grid>

        {userStatus && (
          <Box mt={4}>
            <Typography variant="h6">User Status</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">CE State</Typography>
                <Typography>Position: {userStatus.ceState.position}</Typography>
                <Typography>
                  Buy Price: {userStatus.ceState.buyPrice}
                </Typography>
                <Typography>
                  Stop Loss: {userStatus.ceState.stopLoss.toFixed(2)}
                </Typography>
                <Typography>
                  Profit Target: {userStatus.ceState.profitTarget.toFixed(2)}
                </Typography>
                { userStatus.ceState.minPrice !== undefined && (
                    <Typography>
                      Compared LP: {userStatus.ceState.minPrice.toFixed(2)}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">PE State</Typography>
                <Typography>Position: {userStatus.peState.position}</Typography>
                <Typography>
                  Buy Price: {userStatus.peState.buyPrice}
                </Typography>
                <Typography>
                  Stop Loss: {userStatus.peState.stopLoss.toFixed(2)}
                </Typography>
                <Typography>
                  Profit Target: {userStatus.peState.profitTarget.toFixed(2)}
                </Typography>
                {userStatus.peState.minPrice !== undefined && (
                    <Typography>
                      Compared LP: {userStatus.peState.minPrice.toFixed(2)}
                    </Typography>
                  )}
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
