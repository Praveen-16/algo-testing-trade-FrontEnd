// Remove these unused imports if you are using the text symbols (▲, ▼, —)
// import { green, red, grey } from '@mui/material/colors'; 
// import { ArrowUpward, ArrowDownward, Remove } from "@mui/material"; 

import {
  // ... existing imports
  Grid,
  // ... existing imports
  TextField,
  Typography,
} from "@mui/material";

const NiftyAnalysis = ({ spotPrice, change, r1, r2, s1, s2, darkMode }) => {
  const changeColor = change >= 0 ? "#4caf50" : "#f44336"; // Green (Success) / Red (Error) - Standard

  // Define colors based on the theme
  const cardBackgroundColor = darkMode ? "#2c2c2c" : "#f9f9f9";
  const cardBorderColor = darkMode ? "#555" : "#ccc";
  const labelColor = darkMode ? "#aaa" : "textSecondary";
  const primaryTextColor = darkMode ? "#fff" : "#000";

  // Hex codes for status: Green, Red, Grey
  const GREEN = "#4caf50";
  const RED = "#f44336";
  const GREY = darkMode ? "#aaa" : "#555"; 

  // --- NEW LOGIC FOR STATUS INDICATOR ---
  let spotPriceStatus = {
    text: "Between Levels",
    color: GREY,
    symbol: "—", // Dash for Neutral
  };

  const currentSpot = parseFloat(spotPrice);
  const resistance1 = parseFloat(r1);
  const support1 = parseFloat(s1);

  if (isNaN(currentSpot) || currentSpot === 0) {
      spotPriceStatus = {
          text: "Price Unavailable",
          color: GREY,
          symbol: "—",
      };
  } else if (r1 && currentSpot >= resistance1) {
    // Spot Price is at or above Resistance 1
    const differencePoints = currentSpot - resistance1;
    const differenceText = `+${differencePoints.toFixed(2)} points`;
    
    spotPriceStatus = {
      text: `Above R1 (${differenceText})`, // Updated text
      color: GREEN,
      symbol: "▲", // Triangle Up for Bullish
    };
  } else if (s1 && currentSpot <= support1) {
    // Spot Price is at or below Support 1
    const differencePoints = support1 - currentSpot;
    const differenceText = `-${differencePoints.toFixed(2)} points`;

    spotPriceStatus = {
      text: `Below S1 (${differenceText})`, // Updated text
      color: RED,
      symbol: "▼", // Triangle Down for Bearish
    };
  } else if (r1 && s1) {
      // If between R1 and S1, show difference to the closest level
      const diffToR1 = resistance1 - currentSpot; // Positive value
      const diffToS1 = currentSpot - support1;   // Positive value

      if (diffToR1 <= diffToS1) {
          // Closer to R1 (Resistance)
          const differenceText = `-${diffToR1.toFixed(2)} to R1`;
          spotPriceStatus.text = `Approaching R1 (${differenceText})`;
          spotPriceStatus.color = GREY; // Neutral/Caution
      } else {
          // Closer to S1 (Support)
          const differenceText = `+${diffToS1.toFixed(2)} to S1`;
          spotPriceStatus.text = `Approaching S1 (${differenceText})`;
          spotPriceStatus.color = GREY; // Neutral/Caution
      }
      spotPriceStatus.symbol = "~"; // Approaching symbol
  }

  // --- END NEW LOGIC ---

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
            
            {/* NEW: STATUS INDICATOR using text symbols and points difference */}
            {r1 && s1 && ( // Only show status if R1 and S1 are available
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', color: spotPriceStatus.color }}>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginRight: '4px', color: spotPriceStatus.color }}>
                         {spotPriceStatus.symbol} {/* Display the symbol */}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: spotPriceStatus.color }}>
                        {spotPriceStatus.text} {/* Display the status text including points difference */}
                    </Typography>
                </div>
            )}
            
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