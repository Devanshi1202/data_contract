import { useUser } from "@clerk/clerk-react";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  console.log(user,"user");
  

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">Hello,{user.username}!</Typography>
    </Box>
  );
};

export default Dashboard;
