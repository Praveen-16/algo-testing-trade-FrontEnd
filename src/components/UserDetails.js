// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Grid,
//   Button,
// } from "@mui/material";
// import { resetUserDetails } from "../services/api";

// const UserDetails = ({ user }) => {
//   const peValues = user.data.peValues.slice(-5);
//   const ceValues = user.data.ceValues.slice(-5);

//   const handleResetClick = async () => {
//     try {
//       const userName = user.data.name;
//       console.log(userName, "User name for reset");
//       const response = await resetUserDetails(userName);
//       const messaage = response.data;
//       alert(messaage.messaage);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error resetting user details:", error);
//     }
//   };

//   return (
//     <Card className="user-details-card">
//       <CardContent className="user-details-content">
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Typography variant="h5">User Details</Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleResetClick}
//           >
//             Reset
//           </Button>
//         </Grid>

//         <Typography variant="body1" className="detail-item">
//           <strong>Name:</strong> {user.data.name}
//         </Typography>
//         <Typography variant="body1" className="detail-item">
//           <strong>Capital:</strong> {user.data.capital.toFixed(2)}
//         </Typography>
//         <Typography variant="body1" className="detail-item">
//           <strong>Available Balance:</strong>{" "}
//           {user.data.availableBalance.toFixed(2)}
//         </Typography>
//         <Typography variant="body1" className="detail-item">
//           <strong>Net Profit/Loss:</strong>{" "}
//           {user.data.netProfitOrLoss.toFixed(2)}
//         </Typography>
//         <Typography variant="body1" className="detail-item">
//           <strong>Total Trades:</strong> {user.data.totalTrades} (
//           <span style={{ color: "green" }}>+{user.data.totalPositiveTrades}</span>, 
//           <span style={{ color: "red" }}>-{user.data.totalNegativeTrades}</span>)
//         </Typography>
//         <Typography variant="body1" className="detail-item">
//           <strong>Today Trades:</strong> {user.data.todayTradesCount} (
//           <span style={{ color: "green" }}>+{user.data.todayPositiveTrades}</span>, 
//           <span style={{ color: "red" }}>-{user.data.todayNegativeTrades}</span>)
//         </Typography>
//         <Typography variant="body1" className="detail-item">
//           <strong>Unsetteled Funds:</strong> {user.data.unsettledFunds}
//         </Typography>

//         <Grid container spacing={2}>
//           {/* PE Values */}
//           <Grid item xs={6}>
//             <Typography variant="h6" className="detail-item">
//               PE Values (Last 5):
//             </Typography>
//             <List dense>
//               {peValues.length > 0 ? (
//                 peValues.map((pe, index) => (
//                   <ListItem key={index}>
//                     <ListItemText
//                       primary={`Value: ${pe.value.toFixed(2)}`}
//                       secondary={`Time: ${new Date(pe.time).toLocaleString()}`}
//                     />
//                   </ListItem>
//                 ))
//               ) : (
//                 <Typography variant="body2">No PE values available</Typography>
//               )}
//             </List>
//           </Grid>

//           {/* CE Values */}
//           <Grid item xs={6}>
//             <Typography variant="h6" className="detail-item">
//               CE Values (Last 5):
//             </Typography>
//             <List dense>
//               {ceValues.length > 0 ? (
//                 ceValues.map((ce, index) => (
//                   <ListItem key={index}>
//                     <ListItemText
//                       primary={`Value: ${ce.value.toFixed(2)}`}
//                       secondary={`Time: ${new Date(ce.time).toLocaleString()}`}
//                     />
//                   </ListItem>
//                 ))
//               ) : (
//                 <Typography variant="body2">No CE values available</Typography>
//               )}
//             </List>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default UserDetails;


import React from "react";
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
import { resetUserDetails } from "../services/api";

const UserDetails = ({ user }) => {
  const peValues = user.data.peValues.slice(-5);
  const ceValues = user.data.ceValues.slice(-5);

  const handleResetClick = async () => {
    try {
      const userName = user.data.name;
      console.log(userName, "User name for reset");
      const response = await resetUserDetails(userName);
      const messaage = response.data;
      alert(messaage.messaage);
      window.location.reload();
    } catch (error) {
      console.error("Error resetting user details:", error);
    }
  };

  return (
    <Card className="user-details-card">
      <CardContent className="user-details-content">
        <Grid container justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Typography variant="h5">User Details</Typography>
            <Box
              sx={{
                width: 12,
                height: 12,
                marginBottom:1,
                borderRadius: "50%",
                backgroundColor: user.data.doTrade ? "green" : "red",
                marginLeft: 1,
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleResetClick}
          >
            Reset
          </Button>
        </Grid>

        <Typography variant="body1" className="detail-item">
          <strong>Name:</strong> {user.data.name}
        </Typography>
        <Typography variant="body1" className="detail-item">
          <strong>Capital:</strong> {user.data.capital.toFixed(2)}
        </Typography>
        <Typography variant="body1" className="detail-item">
          <strong>Available Balance:</strong>{" "}
          {user.data.availableBalance.toFixed(2)}
        </Typography>
        <Typography variant="body1" className="detail-item">
          <strong>Net Profit/Loss:</strong>{" "}
          {user.data.netProfitOrLoss.toFixed(2)}
        </Typography>
        <Typography variant="body1" className="detail-item">
          <strong>Total Trades:</strong> {user.data.totalTrades} (
          <span style={{ color: "green" }}>+{user.data.totalPositiveTrades}</span>,{" "}
          <span style={{ color: "red" }}>-{user.data.totalNegativeTrades}</span>)
        </Typography>
        <Typography variant="body1" className="detail-item">
          <strong>Today Trades:</strong> {user.data.todayTradesCount} (
          <span style={{ color: "green" }}>+{user.data.todayPositiveTrades}</span>,{" "}
          <span style={{ color: "red" }}>-{user.data.todayNegativeTrades}</span>)
        </Typography>
        <Typography variant="body1" className="detail-item">
          <strong>Unsettled Funds:</strong> {user.data.unsettledFunds}
        </Typography>

        <Grid container spacing={2}>
          {/* PE Values */}
          <Grid item xs={6}>
            <Typography variant="h6" className="detail-item">
              PE Values (Last 5):
            </Typography>
            <List dense>
              {peValues.length > 0 ? (
                peValues.map((pe, index) => (
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

          {/* CE Values */}
          <Grid item xs={6}>
            <Typography variant="h6" className="detail-item">
              CE Values (Last 5):
            </Typography>
            <List dense>
              {ceValues.length > 0 ? (
                ceValues.map((ce, index) => (
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
