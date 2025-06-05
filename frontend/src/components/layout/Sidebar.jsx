import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as DataContractLogo } from "../../assets/svg/DataContractLogo.svg";
import { ReactComponent as ProducerLogo } from "../../assets/svg/producer.svg";
import { ReactComponent as ConsumerLogo } from "../../assets/svg/consumer.svg";
import { ReactComponent as Logout } from "../../assets/svg/export.svg";
import { useAuth, useUser } from "@clerk/clerk-react";

const drawerWidth = 280;

const Sidebar = ({ isMobile, mobileOpen, onDrawerToggle }) => {
  const [selectedItem, setSelectedItem] = useState("Producer Contract");
  const navigate = useNavigate(); // Use useNavigate hook
  const location = useLocation();
  const { signOut } = useAuth();
  const { user } = useUser();

  const menuToRouteMap = {
    "Producer Contract": "/producer-contract",
    "Consumer Contract": "/consumer-contract",
  };

  const routeToMenuMap = {
    "/producer-contract": "Producer Contract",
    "/consumer-contract": "Consumer Contract",
  };

  useEffect(() => {
    let currentMenuItem = routeToMenuMap[location.pathname];
    if (currentMenuItem) {
      setSelectedItem(currentMenuItem);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    navigate(menuToRouteMap[item]);
  };

  // const [loading, setLoading] = useState(false);

  const renderIcon = (item, isSelected) => {
    // const iconColor = isSelected ? "#00B894" : "";

    switch (item) {
      case "Producer Contract":
        return <ProducerLogo />;
      case "Consumer Contract":
        return <ConsumerLogo />;
      default:
        return null;
    }
  };

  // const getInitial = (name) => {
  //   return name ? name.charAt(0).toUpperCase() : "";
  // };

  // if (loading) {
  //   <CircularProgress />;
  // }

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={isMobile ? onDrawerToggle : undefined}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#F9FAFB",
          border: "none",
          borderRight: "1px solid #EAEAEA",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Top Section */}
      <Box sx={{ p: 1 }}>
        {/* Header Section */}
        <Box sx={{ mb: 1, p: 2 }}>
          <DataContractLogo
            width="150"
            height="37"
            style={{ marginBottom: "10px" }}
          />
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                mr: 2,
                color: "#525455",
                fontWeight: "bold",
                background: "#E9E9E9",
              }}
            >
              {/* {userInfo?.name.charAt(0).toUpperCase()} */}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="500">
                Hello, {user.username}
                {/* {userInfo?.name} */}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Main Menu */}
        <Box>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ mb: 1, ml: 2 }}
          >
            MAIN MENU
          </Typography>
          <List>
            {["Producer Contract", "Consumer Contract"].map((item) => (
              <ListItemButton
                key={item}
                onClick={() => handleMenuItemClick(item)}
                selected={selectedItem === item}
                sx={{
                  backgroundColor:
                    selectedItem === item ? "#F7EAFF" : "transparent",
                  "&:hover": {
                    backgroundColor: "#F7EAFF",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#F7EAFF !important",
                    "&:hover": {
                      backgroundColor: "#F7EAFF",
                    },
                  },
                  "& .MuiListItemIcon-root": {
                    color: selectedItem === item ? "primary.main" : "inherit",
                  },
                  "& .MuiListItemText-primary": {
                    color: selectedItem === item ? "primary.main" : "inherit",
                  },
                  borderRadius: "8px",
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    "& svg": {
                      width: "20px",
                      height: "20px",
                      // Apply green filter when selected
                      filter:
                        selectedItem === item
                          ? "brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(7475%) hue-rotate(273deg) brightness(96%) contrast(105%)"
                          : "none",
                    },
                  }}
                >
                  {renderIcon(item, selectedItem === item)}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>

      {/* Upgrade Card */}
      {/* <Box
        sx={{
          p: 2,
          mx: 2,
          borderRadius: 2,
          bgcolor: "#fff",
          boxShadow: 1,
          textAlign: "left",
          mt: 8,
        }}
      >
        <img
          src={UpgradeLogo}
          alt="Upgrade"
          style={{
            width: "40%",
            height: "auto",
          }}
        />
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          color="#525455"
        >
          Want more Features?
        </Typography>
        <Typography variant="body2" color="#989898" gutterBottom mb={2}>
          Please upgrade to a higher plan to get more features.
        </Typography>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#00B894",
            fontWeight: "bold",
          }}
        >
          Upgrade
        </Button>
      </Box> */}

      {/* Footer Section */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ mb: 1, ml: 2 }}
        >
          OTHER
        </Typography>
        <List>
          <ListItemButton
            sx={{
              backgroundColor:
                selectedItem === "Logout" ? "#F7EAFF" : "transparent",
              "&:hover": {
                backgroundColor: "#F7EAFF",
              },
              "&.Mui-selected": {
                backgroundColor: "#F7EAFF !important",
                "&:hover": {
                  backgroundColor: "#F7EAFF",
                },
              },
              "& .MuiListItemIcon-root": {
                color: selectedItem === "Logout" ? "primary.main" : "inherit",
              },
              "& .MuiListItemText-primary": {
                color: selectedItem === "Logout" ? "primary.main" : "inherit",
              },
              borderRadius: "8px",
              mx: 1,
              my: 0.5,
            }}
            onClick={() => {
              signOut(() => {
                window.location.href = "/login"; 
              });
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "40px",
                "& svg": {
                  width: "20px",
                  height: "20px",
                  // Apply green filter when selected
                  filter:
                    selectedItem === "Logout"
                      ? "brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(7475%) hue-rotate(273deg) brightness(96%) contrast(105%)"
                      : "none",
                },
              }}
            >
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
          {/* <ListItemButton
            sx={{
              backgroundColor:
                selectedItem === "Help & Support" ? "#E6F4F1" : "transparent",
              "&:hover": {
                backgroundColor: "#E6F4F1",
              },
              "&.Mui-selected": {
                backgroundColor: "#E6F4F1 !important",
                "&:hover": {
                  backgroundColor: "#E6F4F1",
                },
              },
              "& .MuiListItemIcon-root": {
                color:
                  selectedItem === "Help & Support" ? "#00B894" : "inherit",
              },
              "& .MuiListItemText-primary": {
                color:
                  selectedItem === "Help & Support" ? "#00B894" : "inherit",
              },
              borderRadius: "8px",
              mx: 1,
              my: 0.5,
            }}
            onClick={() => handleMenuItemClick("Help & Support")}
          >
            <ListItemIcon
              sx={{
                minWidth: "40px",
                "& svg": {
                  width: "20px",
                  height: "20px",
                  // Apply green filter when selected
                  filter:
                    selectedItem === "Help & Support"
                      ? "invert(46%) sepia(72%) saturate(2499%) hue-rotate(133deg) brightness(96%) contrast(105%)"
                      : "none",
                },
              }}
            >
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItemButton> */}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
