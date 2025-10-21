import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  getInstruments,
  getNifty50Value,
  getBnkNiftyValue,
  getTokenDetails,
  storeTokenManohar,
} from "../services/api";
import { DB_URL, LOGIN_URL, LOGS_URL } from "../utils/links/URLs";

const TradeForm = ({
  onGenerateToken,
  onSubmitInstrumentKeyCE,
  onSubmitInstrumentKeyPE,
  onStartTrading,
  onStopTrading,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [niftyDataFetched, setNiftyDataFetched] = useState(false);
  const [savedInstruments, setSavedInstruments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [isTokenToday, setIsTokenToday] = useState(false);
  const [apiFormattedDate, setApiFormattedDate] = useState("");
  const [manoharToken, setManoharToken] = useState("");
  const [isStoring, setIsStoring] = useState(false);
  const darkMode = localStorage.getItem("theme") === "dark";

  useEffect(() => {
    const fetchInstruments = async () => {
      setApiLoading(true);
      try {
        const response = await getInstruments();
        const instrumentsData = response.data.map((instrument) => ({
          name: instrument.name,
          callOptionSymbol: instrument.callOptionSymbol,
          putOptionSymbol: instrument.putOptionSymbol,
          updatedAt: instrument.updatedAt,
        }));
        setSavedInstruments(instrumentsData);
      } catch (error) {
        console.error("Error fetching instruments", error);
      } finally {
        setApiLoading(false);
      }
    };
    fetchInstruments();
  }, [niftyDataFetched]);

  useEffect(() => {
    const checkTokenDate = async () => {
      try {
        const tokenDetails = await getTokenDetails();
        const apiDate = new Date(tokenDetails.data.createdAt);
        const formattedDate = apiDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        });
        setApiFormattedDate(formattedDate);
        const todayUTC = new Date();
        const isToday =
          apiDate.getUTCDate() === todayUTC.getUTCDate() &&
          apiDate.getUTCMonth() === todayUTC.getUTCMonth() &&
          apiDate.getUTCFullYear() === todayUTC.getUTCFullYear();
        setIsTokenToday(isToday);
      } catch (error) {
        console.error("Error fetching token details", error);
      }
    };
    checkTokenDate();
  }, []);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleStoreManoharToken = async () => {
    if (!manoharToken.trim()) {
      setSnackbarMessage("Please enter a valid Manohar token");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setIsStoring(true);
    try {
      const res = await storeTokenManohar({ manoharToken });
      setSnackbarMessage(res.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setManoharToken("");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to store Manohar token");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsStoring(false);
    }
  };

  const handleStartTrading = async () => {
    setLoading(true);
    try {
      await onStartTrading();
      setSnackbarMessage("Trading started successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to start trading.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStopTrading = async () => {
    setLoading(true);
    try {
      await onStopTrading();
      setSnackbarMessage("Connection Closed Successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to stop trading.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNifty50Data = async () => {
    setApiLoading(true);
    try {
      const data = await getNifty50Value();
      setSnackbarMessage(data.data.message);
      setSnackbarOpen(true);
      setNiftyDataFetched((prev) => !prev);
    } catch (error) {
      setSnackbarMessage("Failed setting Nifty 50 Data");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setApiLoading(false);
    }
  };

  const handleBankNiftyData = async () => {
    setApiLoading(true);
    try {
      const data = await getBnkNiftyValue();
      setSnackbarMessage(data.data.message);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed setting Bank Nifty Data");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="trade-form-container">
      <Grid container spacing={2} className="trade-form" alignItems="center">
        <Grid item xs={6}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Button
              variant="contained"
              href={LOGIN_URL}
              target="_blank"
              fullWidth
              disabled={apiLoading || apiFormattedDate === ""}
              style={{
                backgroundColor:
                  apiLoading || apiFormattedDate === ""
                    ? "#B0BEC5"
                    : isTokenToday
                    ? "#1976d2"
                    : "#FF9800",
                color: "white",
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              {apiLoading || apiFormattedDate === "" ? (
                <span>
                  <strong>Loading...</strong>
                  <br />
                  <span style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
                    Please wait while we verify the token status.
                  </span>
                </span>
              ) : isTokenToday ? (
                <span>
                  <strong>Token Active</strong>
                  <br />
                  <span style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
                    Your token is valid for today.
                  </span>
                </span>
              ) : (
                <span>
                  <strong>Token Expired</strong>
                  <br />
                  <span style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
                    Generated on {apiFormattedDate}. Click to renew.
                  </span>
                </span>
              )}
            </Button>
          </div>
        </Grid>
   {/* ======== New Manohar Token Input ======== */}
        
        <Grid item xs={6}>
          <Button
            variant="contained"
            target="_blank"
            href={LOGS_URL}
            fullWidth
            style={{ backgroundColor: "#607d8b", color: "white" }}
          >
            Logs
          </Button>
          <Button
            variant="contained"
            target="_blank"
            href={DB_URL}
            fullWidth
            style={{
              backgroundColor: "#033530",
              color: "white",
              marginTop: "5px",
            }}
          >
            DB
          </Button>
        </Grid>
      </Grid>

      {/* Start/Stop Trading & Nifty Buttons */}
      <Grid container spacing={2} className="trade-form" style={{ marginTop: "20px" }}>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleStartTrading}>
            Start Trading
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#f44336", color: "white" }}
            onClick={handleStopTrading}
          >
            Stop Trading
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleNifty50Data}>
            Nifty50 Data
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleBankNiftyData}>
            BankNifty Data
          </Button>
        </Grid>
      </Grid>
    <Grid container spacing={1} alignItems="center">
              <Grid item xs={8}>
               <TextField
  variant="outlined"
  label="Enter Manohar Token"
  fullWidth
  value={manoharToken}
  onChange={(e) => setManoharToken(e.target.value)}
  InputLabelProps={{
    style: {
      color: darkMode ? "#ccc" : "#555",
    },
  }}
  InputProps={{
    style: {
      color: darkMode ? "#fff" : "#000",
      backgroundColor: darkMode ? "#2c2c2c" : "#f5f5f5",
      borderRadius: "8px",
    },
  }}
/>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleStoreManoharToken}
                  disabled={isStoring}
                  style={{
                    padding: "10px 0",
                    backgroundColor: isStoring ? "#888" : "#1976d2",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {isStoring ? <CircularProgress size={24} color="inherit" /> : "Save Token"}
                </Button>
              </Grid>
            </Grid>
      {/* Saved Instruments Table */}
      <div className="saved-instruments" style={{ marginTop: "30px" }}>
        <h2>Saved Instruments</h2>
        {(loading || apiLoading) && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress />
          </div>
        )}
        {!loading && !apiLoading && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Call Option Symbol</TableCell>
                <TableCell>Put Option Symbol</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {savedInstruments
          .filter((instrument) => instrument.name === "Nifty 50")
          .map((instrument) => (
            <TableRow key={instrument.name}>
              <TableCell>{instrument.name}</TableCell>
              <TableCell>{instrument.callOptionSymbol}</TableCell>
              <TableCell>{instrument.putOptionSymbol}</TableCell>
              <TableCell>{instrument.updatedAt}</TableCell>
            </TableRow>
          ))}

            </TableBody>
          </Table>
        )}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default TradeForm;
