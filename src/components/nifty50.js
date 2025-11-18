import {
  // ... existing imports
  Grid,
  // ... existing imports
  TextField,
  // ADD THIS:
  Typography,
} from "@mui/material";
const NiftyAnalysis = ({ spotPrice, change, r1, r2, s1, s2, darkMode }) => {
  const changeColor = change >= 0 ? "#4caf50" : "#f44336"; // Green (Success) / Red (Error) - Standard

  // Define colors based on the theme
  const cardBackgroundColor = darkMode ? "#2c2c2c" : "#f9f9f9";
  const cardBorderColor = darkMode ? "#555" : "#ccc";
  const labelColor = darkMode ? "#aaa" : "textSecondary";
  const primaryTextColor = darkMode ? "#fff" : "#000";

  return (
    <div style={{ marginTop: "30px" }}>
      <Typography variant="h6" gutterBottom style={{ fontWeight: "bold", color: primaryTextColor }}>
        NIFTY ANALYSIS
      </Typography>
      <div
        style={{
          border: `1px solid ${cardBorderColor}`,
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: cardBackgroundColor, 
        }}
      >
        <Grid container spacing={4}>
                  {/* SUPPORT */}
          <Grid item xs={4}>
            <Typography variant="body2" color={labelColor} style={{ fontWeight: 'bold' }}>
              SUPPORT
            </Typography>
            <div style={{ marginTop: "10px" }}>
              {/* Support colors remain green, as they indicate support regardless of theme */}
              <Typography variant="body1" style={{ color: "#4caf50", fontWeight: "bold" }}>
                S1: {s1 || "N/A"}
              </Typography>
              <Typography variant="body1" style={{ color: "#4caf50", fontWeight: "bold" }}>
                S2: {s2 || "N/A"}
              </Typography>
            </div>
          </Grid>
          {/* SPOT PRICE */}
          <Grid item xs={4}>
            <Typography variant="body2" color={labelColor} style={{ fontWeight: 'bold' }}>
              SPOT PRICE
            </Typography>
            <Typography variant="h4" style={{ fontWeight: "bold", marginTop: "5px", color: primaryTextColor }}>
              {spotPrice || "0.00"}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <Typography variant="subtitle1" style={{ color: changeColor, fontWeight: 'bold' }}>
                {change > 0 ? `+${change}` : change}
              </Typography>
            </div>
          </Grid>

          {/* RESISTANCE */}
          <Grid item xs={4}>
            <Typography variant="body2" color={labelColor} style={{ fontWeight: 'bold' }}>
              RESISTANCE
            </Typography>
            <div style={{ marginTop: "10px" }}>
              {/* Resistance colors remain red, as they indicate resistance regardless of theme */}
              <Typography variant="body1" style={{ color: "#f44336", fontWeight: "bold" }}>
                R1: {r1 || "N/A"}
              </Typography>
              <Typography variant="body1" style={{ color: "#f44336", fontWeight: "bold" }}>
                R2: {r2 || "N/A"}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NiftyAnalysis;