import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InputAdornment from '@mui/material/InputAdornment';
import { ReactComponent as EyeIcon } from "../assets/svg/eye.svg";
import { ReactComponent as EditIcon } from "../assets/svg/edit.svg";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";


const ProducerContract = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const tableData = [
    {
      id: "001",
      name: "Contract Alpha",
      status: "Active",
      owner: "John Doe",
    },
    {
      id: "002",
      name: "Contract Beta",
      status: "Pending",
      owner: "Jane Smith",
    },
    {
      id: "003",
      name: "Contract Gamma",
      status: "Completed",
      owner: "Jane Smith",
    },
    {
      id: "004",
      name: "Contract Phi",
      status: "Completed",
      owner: "Jane Smith",
    },
  ];

  return (
    <Box p={3}>
      {/* Heading and Subtext */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold" color="black">
          List Producer Contracts
        </Typography>
        <Typography variant="body2" color="#989898">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet facilisis massa.
        </Typography>
      </Box>

      {/* Controls (search + buttons) */}
      <Stack direction="row" justifyContent="space-between" mb={2} spacing={1} flexWrap="wrap">
        {/* Left: Search (aligned to table edge) */}
        <Box flexGrow={1} minWidth="250px">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Contract ID & Contract Name"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ width: 16, height: 16, stroke: "#525455" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#fff",
              input: {
                paddingY: 1.2, "&::placeholder": {
                  color: "#999999",
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        {/* Right: Buttons */}
        <Stack direction="row" spacing={1} mt={{ xs: 2, sm: 0 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ borderColor: "#DFDFDF", color: "#525455" }}
          >
            Filter
          </Button>

          <Button
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuClick}
            sx={{ borderColor: "#DFDFDF", color: "#525455" }}
          >
            Status
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Active</MenuItem>
            <MenuItem onClick={handleMenuClose}>Pending</MenuItem>
            <MenuItem onClick={handleMenuClose}>Completed</MenuItem>
          </Menu>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9D00FF",
              color: "#fff",
              "&:hover": { backgroundColor: "#8500d6" },
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={{ border: "1px solid #DFDFDF" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              <TableCell>Contract ID</TableCell>
              <TableCell>Contract Name</TableCell>
              <TableCell>Contract Status</TableCell>
              <TableCell>Contract Owner</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <EyeIcon style={{ color: "#525455", width: 20, height: 20 }} />
                  </IconButton>
                  <IconButton>
                    <EditIcon style={{ color: "#525455", width: 20, height: 20 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProducerContract;
