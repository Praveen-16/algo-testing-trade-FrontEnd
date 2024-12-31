import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import {
  getInstruments,
  getNifty50Value,
  getBnkNiftyValue,
} from "../services/api";
import { LOGIN_URL, LOGS_URL } from "../utils/links/URLs";

const TradeForm = ({
  onGenerateToken,
  onSubmitInstrumentKeyCE,
  onSubmitInstrumentKeyPE,
  onStartTrading,
  onStopTrading,
}) => {
  const [tokenData, setTokenData] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [savedInstruments, setSavedInstruments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false); // New state to track API loading

  useEffect(() => {
    const fetchInstruments = async () => {
      setApiLoading(true); // Set loading state to true while fetching data
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
        setApiLoading(false); // Set loading state to false once the data is fetched
      }
    };
    setApiLoading(true);
    fetchInstruments();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGenerateToken = async () => {
    setLoading(true);
    try {
      await onGenerateToken(tokenData);
      setSnackbarMessage("Token generated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to generate token.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
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
    setApiLoading(true); // Set loading state to true while fetching data
    try {
      const data = await getNifty50Value();
      setSnackbarMessage(data.data.message);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed setting Nifty 50 Data");
      setSnackbarSeverity("error");
    } finally {
      setApiLoading(false); // Set loading state to false once the data is fetched
    }
  };

  const handleBankNiftyData = async () => {
    setApiLoading(true); // Set loading state to true while fetching data
    try {
      const data = await getBnkNiftyValue();
      setSnackbarMessage(data.data.message);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed setting Nifty 50 Data");
      setSnackbarSeverity("error");
    } finally {
      setApiLoading(false); // Set loading state to false once the data is fetched
    }
  };

  return (
    <div className="trade-form-container">
    <Grid container spacing={2} className="trade-form" alignItems="center">
  {/* Token Input */}
  <Grid item xs={6}>
    <TextField
      fullWidth
      label="Token Data"
      value={tokenData}
      onChange={(e) => setTokenData(e.target.value)}
    />
    <Button variant="contained" onClick={handleGenerateToken} fullWidth>
      Generate Token
    </Button>
  </Grid>

  {/* Login and Logs Buttons */}
  <Grid item xs={6}>
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Button
        variant="contained"
        href={LOGIN_URL}
        target="_blank"
        fullWidth
      >
        Login
      </Button>
      <Button
        variant="contained"
        href={LOGS_URL}
        target="_blank"
        fullWidth
        style={{ backgroundColor: "#607d8b", color: "white" }}
      >
        Logs
      </Button>
    </div>
  </Grid>
</Grid>

      <Grid container spacing={2} className="trade-form">
        {/* Start/Stop Trading Buttons */}
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
            Get Nifty50Data
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleBankNiftyData}>
            Get BankNiftyData
          </Button>
        </Grid>
      </Grid>

      {/* Loader */}
      {(loading || apiLoading) && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}

      {/* Saved Instruments Table */}
      <div className="saved-instruments">
        <h2>Saved Instruments</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Trading Symbol CE</TableCell>
              <TableCell>Trading Symbol PE</TableCell>
              <TableCell>Saved At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedInstruments.map((instrument, index) => (
              <TableRow key={index}>
                <TableCell>{instrument.name}</TableCell>
                <TableCell>{instrument.callOptionSymbol}</TableCell>
                <TableCell>{instrument.putOptionSymbol}</TableCell>
                <TableCell>{instrument.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default TradeForm;
