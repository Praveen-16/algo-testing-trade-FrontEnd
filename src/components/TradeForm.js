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
} from "@mui/material";
import {
  getInstruments,
  getNifty50Value,
  getBnkNiftyValue,
  getTokenDetails,
} from "../services/api";
import { LOGIN_URL, LOGS_URL } from "../utils/links/URLs";

const TradeForm = ({
  onGenerateToken,
  onSubmitInstrumentKeyCE,
  onSubmitInstrumentKeyPE,
  onStartTrading,
  onStopTrading,
}) => {
  // const [tokenData, setTokenData] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [savedInstruments, setSavedInstruments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [isTokenToday, setIsTokenToday] = useState(false);
  const [apiFormattedDate, setApiFormattedDate] = useState("");

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
    setApiLoading(true);
    fetchInstruments();
  }, []);

  useEffect(() => {
    const checkTokenDate = async () => {
      try {
        const tokenDetails = await getTokenDetails();
        console.log(tokenDetails.data.createdAt, "tokenDetails");

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
        console.log(`API Date (UTC): ${apiDate}`);
        console.log(`Today's Date (UTC): ${todayUTC}`);
        console.log(`Is token from today (UTC comparison): ${isToday}`);
      } catch (error) {
        console.error("Error fetching token details", error);
      }
    };

    checkTokenDate();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleGenerateToken = async () => {
  //   setLoading(true);
  //   try {
  //     await onGenerateToken(tokenData);
  //     setSnackbarMessage("Token generated successfully!");
  //     setSnackbarSeverity("success");
  //     setSnackbarOpen(true);
  //   } catch (error) {
  //     setSnackbarMessage("Failed to generate token.");
  //     setSnackbarSeverity("error");
  //     setSnackbarOpen(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    } catch (error) {
      setSnackbarMessage("Failed setting Nifty 50 Data");
      setSnackbarSeverity("error");
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
      setSnackbarMessage("Failed setting Nifty 50 Data");
      setSnackbarSeverity("error");
    } finally {
      setApiLoading(false); 
    }
  };

  return (
    <div className="trade-form-container">
      <Grid container spacing={2} className="trade-form" alignItems="center">
        <Grid item xs={6}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Button
              variant="contained"
              href={LOGIN_URL}
              target="_blank"
              fullWidth
              style={{
                backgroundColor: isTokenToday ? "#1976d2" : "#FF9800", 
                color: "white",
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              {isTokenToday ? (
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

            <Button
              variant="contained"
              target="_blank"
              href={LOGS_URL}
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


      {/* Saved Instruments Table */}
      <div className="saved-instruments">
        <h2>Saved Instruments</h2>
                        {/* Loader */}
      {(loading || apiLoading) && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}
{
        !loading && !apiLoading && (
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
              {savedInstruments.map((instrument) => (
                <TableRow key={instrument.name}>
                  <TableCell>{instrument.name}</TableCell>
                  <TableCell>{instrument.callOptionSymbol}</TableCell>
                  <TableCell>{instrument.putOptionSymbol}</TableCell>
                  <TableCell>{instrument.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
}
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
