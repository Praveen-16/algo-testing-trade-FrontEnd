import React, { useEffect, useState } from "react";
import {
  Container,
  Snackbar,
  Grid,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  getUserData,
  generateToken,
  submitInstrumentKeyCE,
  submitInstrumentKeyPE,
  startTrading,
  stopTrading,
} from "../services/api";
import UserDetails from "../components/UserDetails";
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import LogoImage from "../utils/images/loading-image.jpg";
import { addUnsetteldFunds } from "../services/api";

const Dashboard = () => {
  const [isNifty50, setIsNifty50] = useState(true);
  const [isBankNifty, setIsBankNifty] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleToggle = () => {
    setIsNifty50(!isNifty50);
    setIsBankNifty(isNifty50);
  };

  const [users, setUsers] = useState({});
  const [trades, setTrades] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchUserData = async () => {
      const userNames = [
        "user5",
        "user10",
        "user606",
        "Bank Nifty 1",
        "user9015",
      ];
      try {
        const fetchedUsers = {};
        const fetchedTrades = {};

        await Promise.all(
          userNames.map(async (name) => {
            const userData = await getUserData({ name });
            fetchedUsers[name] = userData;
            fetchedTrades[name] = userData.data.trades;
          })
        );

        setUsers(fetchedUsers);
        setTrades(fetchedTrades);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGenerateToken = async (data) => {
    let code = { code: data };
    try {
      await generateToken(code);
      setSnackbarMessage("Token generated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to generate token.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubmitInstrumentKeyCE = async (data) => {
    let tradingSymbol = { tradingSymbol: data };
    try {
      await submitInstrumentKeyCE(tradingSymbol);
      setSnackbarMessage("Instrument Key CE submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to submit Instrument Key CE.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubmitInstrumentKeyPE = async (data) => {
    let tradingSymbol = { tradingSymbol: data };
    try {
      await submitInstrumentKeyPE(tradingSymbol);
      setSnackbarMessage("Instrument Key PE submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to submit Instrument Key PE.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleStartTrading = async () => {
    try {
      await startTrading();
      setSnackbarMessage("Trading started successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to start trading.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleStopTrading = async () => {
    try {
      await stopTrading();
      setSnackbarMessage("Connection Closed Successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to Stop trading.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handelUpdateFunds = async () => {
    const response = await addUnsetteldFunds();
    const message = response.data;
    setSnackbarMessage(message.messaage);
    setSnackbarOpen(true);
  };

  return (
    <div className="container">
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={60} />

          {/* <img src={LogoImage} alt="Loading Logo" style={{ width: '150px', marginTop: '20px' }} />  */}

          <Typography
            variant="h6"
            color="textSecondary"
            style={{ marginTop: "10px" }}
          >
            Loading, please wait...
          </Typography>
        </div>
      ) : (
        <>
          <div>
            <center className="heading">Algo Trading Testing</center>
          </div>
          <TradeForm
            onGenerateToken={handleGenerateToken}
            onSubmitInstrumentKeyCE={handleSubmitInstrumentKeyCE}
            onSubmitInstrumentKeyPE={handleSubmitInstrumentKeyPE}
            onStartTrading={handleStartTrading}
            onStopTrading={handleStopTrading}
            className="trade-form"
          />
          <Button variant="contained" onClick={handleToggle}>
            {isNifty50 ? "Switch to BankNifty" : "Switch to Nifty50"}
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            style={{ marginLeft: "16px" }}
            onClick={handelUpdateFunds}
          >
            Add Unsettled Funds
          </Button>

          {isNifty50 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {users["user5"] && (
                  <>
                    <div className="user-details">
                      <UserDetails user={users["user5"]} />
                    </div>
                    <TradeList
                      trades={trades["user5"]}
                      className="trade-table"
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {users["user10"] && (
                  <>
                    <div className="user-details">
                      <UserDetails user={users["user10"]} />
                    </div>{" "}
                    <TradeList
                      trades={trades["user10"]}
                      className="trade-table"
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {users["user9015"] && (
                  <>
                    <div className="user-details">
                      <UserDetails user={users["user9015"]} />
                    </div>
                    <TradeList
                      trades={trades["user9015"]}
                      className="trade-table"
                    />
                  </>
                )}
              </Grid>
            </Grid>
          )}

          {isBankNifty && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {users["Bank Nifty 1"] && (
                  <>
                    <div className="user-details">
                      <UserDetails user={users["Bank Nifty 1"]} />
                    </div>
                    <TradeList
                      trades={trades["Bank Nifty 1"]}
                      className="trade-table"
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {users["user606"] && (
                  <>
                    <div className="user-details">
                      <UserDetails user={users["user606"]} />
                    </div>
                    <TradeList
                      trades={trades["user606"]}
                      className="trade-table"
                    />
                  </>
                )}
              </Grid>
            </Grid>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            severity={snackbarSeverity}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            ContentProps={{
              className:
                snackbarSeverity === "success"
                  ? "snackbar-success"
                  : "snackbar-error",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
