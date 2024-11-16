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
} from "@mui/material";
import {
  getInstruments,
  getNifty50Value,
  getBnkNiftyValue,
} from "../services/api";

const TradeForm = ({
  onGenerateToken,
  onSubmitInstrumentKeyCE,
  onSubmitInstrumentKeyPE,
  onStartTrading,
  onStopTrading,
}) => {
  const [tokenData, setTokenData] = useState("");
  const [instrumentCE, setInstrumentCE] = useState("NIFTY 24800 CE 24 OCT 24");
  const [instrumentPE, setInstrumentPE] = useState("NIFTY 24800 PE 24 OCT 24");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [savedInstruments, setSavedInstruments] = useState([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await getInstruments();
        const instrumentsData = response.data.map((instrument) => ({
          name: instrument.name,
          callOptionSymbol: instrument.callOptionSymbol,
          putOptionSymbol: instrument.putOptionSymbol,
          updatedAt: instrument.updatedAt,
        }));
        console.log(instrumentsData);
        setSavedInstruments(instrumentsData);
      } catch (error) {
        console.error("Error fetching instruments", error);
      }
    };

    fetchInstruments();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGenerateToken = async () => {
    try {
      await onGenerateToken(tokenData);
      setSnackbarMessage("Token generated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to generate token.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubmitCE = async () => {
    try {
      await onSubmitInstrumentKeyCE(instrumentCE);
      setSnackbarMessage("Instrument Key CE submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to submit Instrument Key CE.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubmitPE = async () => {
    try {
      await onSubmitInstrumentKeyPE(instrumentPE);
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
      await onStartTrading();
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
      await onStopTrading();
      setSnackbarMessage("Connection Closed Successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to stop trading.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleNifty50Data = async () => {
    try {
      const data = await getNifty50Value();
      console.log(data, "cc");
      setSnackbarMessage(data.data.message);
      // setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed setting Nifty 50 Data");
      setSnackbarSeverity("error");
    }
  };

  const handleBankNiftyData = async () => {
    try {
      const data = await getBnkNiftyValue();
      setSnackbarMessage(data.data.message);
      // setSnackbarSeverity("success");An error occurred
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed setting Nifty 50 Data");
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className="trade-form-container">
      <Grid container spacing={2} className="trade-form">
        {/* Token Input */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Token Data"
            value={tokenData}
            onChange={(e) => setTokenData(e.target.value)}
          />
          <Button variant="contained" onClick={handleGenerateToken}>
            Generate Token
          </Button>
        </Grid>

        {/* Instrument CE Input */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Instrument Key CE"
            placeholder="E.g. NIFTY 25400 CE 17 OCT 24"
            value={instrumentCE}
            onChange={(e) => setInstrumentCE(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmitCE}>
            Submit CE
          </Button>
        </Grid>

        {/* Instrument PE Input */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Instrument Key PE"
            placeholder="E.g. NIFTY 25400 PE 17 OCT 24"
            value={instrumentPE}
            onChange={(e) => setInstrumentPE(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmitPE}>
            Submit PE
          </Button>
        </Grid>

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

      {/* Saved Instruments Table */}
      <div className="saved-instruments">
        <h2>Saved Instruments</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trading Symbol CE</TableCell>
              <TableCell>Trading Symbol PE</TableCell>
              <TableCell>Saved At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedInstruments.map((instrument, index) => (
              <TableRow key={index}>
                {/* <TableCell>{instrument.name}</TableCell> */}
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
