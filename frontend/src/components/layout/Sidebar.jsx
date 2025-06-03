import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  Snackbar,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Modal } from "@mui/material";
import {
  KeyboardArrowDown as ArrowDownIcon,
  DeleteOutline,
  UnfoldMore,
  CloseOutlined,
} from "@mui/icons-material";
import {
  DashboardIcon,
  ScannerIcon,
  PeopleIcon,
  ConsentIcon,
  SettingIcon,
  HelpIcon,
  Speedometer,
  DataPrivacyLogo,
  InstallationIcon,
  DataRequestLogo,
  IntegrationIcon,
  DataBreachLogo,
  PrivacyPolicyLogo,
} from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import {
  fetchUserAttributes,
  getCurrentUser,
  updateUserAttributes,
} from "@aws-amplify/auth";
import { useLocation } from "react-router-dom";
import {
  deleteWebsite,
  getAllWebsites,
  getWebsiteById,
} from "../../api/websiteService";
import Loader from "../../CommonComponent/Loader";
import { showSuccessToast } from "../../toastUtils";
import { handleLogout } from "../../services/authService";
import { updateLicense } from "../../api/licensing";
import { updateLicenseUsage } from "../../store/licenseSlice";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 280;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#FFFFFF",
  borderRadius: "16px",
  boxShadow: 24,
  p: 3,
};

const Sidebar = ({ isMobile, mobileOpen, onDrawerToggle }) => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElWebsite, setAnchorElWebsite] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [websiteDetails, setWebsiteDetails] = useState({});
  const [allWebsites, setAllWebsites] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook
  const location = useLocation();

  const handleWebsiteSelect = async (website) => {
    try {
      const user = await getCurrentUser({ bypassCache: true });

      if (!user) {
        throw new Error("User is not authenticated");
      }

      const websiteId = website?.website_id?.toString();

      await updateUserAttributes({
        userAttributes: {
          website: websiteId,
        },
      });

      setSelectedWebsite(website);
      localStorage.setItem("website_id", website.website_id);

      if (window.location.pathname === "/dashboard") {
        window.location.reload();
      } else {
        navigate("/dashboard");
      }
      handleClose();
    } catch (error) {
      throw error;
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleWebisteClick = (event) => {
    setAnchorElWebsite(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorElWebsite(null);
  };

  // const handleLogout = async () => {
  //   try {
  //     await signOut();
  //     sessionStorage.clear();
  //     localStorage.clear();
  //     persistor.purge();
  //     setSnackbarOpen(true);
  //     navigate("/login");
  //   } catch (err) {
  //     console.error("Error during logout:", err);
  //   }
  // };

  const menuToRouteMap = {
    Dashboard: "/dashboard",
    "Website Scan": "/website-scan",
    "Banner Designer": "/banner",
    "Vendor Management": "/vendor-management",
    "Consent Log": "/consent-log",
    "Data Requests": "/data-requests",
    "Data Breach": "/data-breach",
    "Install Plugin": "/install-plugin",
    Integrations: "/integrations",
    "Privacy Policy": "/privacy-policy",
    Settings: "/settings",
    "Help & Support": "/help",
  };

  const routeToMenuMap = {
    "/dashboard": "Dashboard",
    "/website-scan": "Website Scan",
    "/banner": "Banner Designer",
    "/vendor-management": "Vendor Management",
    "/consent-log": "Consent Log",
    "/data-requests": "Data Requests",
    "/data-breach": "Data Breach",
    "/install-plugin": "Install Plugin",
    "/integrations": "Integrations",
    "/privacy-policy": "Privacy Policy",
    "/settings": "Settings",
    "/help": "Help & Support",
  };

  useEffect(() => {
    let currentMenuItem = routeToMenuMap[location.pathname];
    if (!currentMenuItem) {
      if (location.pathname.startsWith("/consent-details")) {
        currentMenuItem = "Consent Log";
      } else if (location.pathname.startsWith("/data-request-details")) {
        currentMenuItem = "Data Requests";
      } else if (location.pathname.startsWith("/data-breach-details")) {
        currentMenuItem = "Data Breach";
      } else if (location.pathname.startsWith("/privacy-settings")) {
        currentMenuItem = "Privacy Policy";
      } else if (location.pathname.startsWith("/privacy-policy/")) {
        currentMenuItem = "Privacy Policy";
      }
    }
    if (currentMenuItem) {
      setSelectedItem(currentMenuItem);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    navigate(menuToRouteMap[item]);
  };

  const [open, setOpen] = React.useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = async () => {
    setLoading(false);
    const data = await getCurrentUser();
    const currentUser = await fetchUserAttributes();
    if (currentUser !== null) {
      setLoading(false);
      setUserInfo(currentUser);
      localStorage.setItem("user_id", data.userId);
    }
  };

  useEffect(() => {
    const userRole = userInfo?.zoneinfo; // Extract role from user info

    if (userRole === "Org_user" && allWebsites.length > 0) {
      const selectedWebsiteExists = allWebsites.some(
        (site) => site.website_id === selectedWebsite?.website_id
      );
      if (!selectedWebsiteExists) {
        // The assigned website no longer exists, so assign the first website from the list
        const newWebsite = allWebsites[0];

        updateUserAttributes({
          userAttributes: {
            website: newWebsite.website_id.toString(),
          },
        })
          .then(() => {
            setSelectedWebsite(newWebsite);
            localStorage.setItem("website_id", newWebsite.website_id);
          })
          .catch((error) => {
            throw error;
          });
      }
    }
    //eslint-disable-next-line
  }, [selectedWebsite, userInfo]);

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  const renderIcon = (item, isSelected) => {
    const iconColor = isSelected ? "#00B894" : "";

    switch (item) {
      case "Dashboard":
        return <DashboardIcon color={iconColor} />;
      case "Website Scan":
        return <ScannerIcon color={iconColor} />;
      case "Banner Designer":
        return <Speedometer color={iconColor} />;
      case "Vendor Management":
        return <PeopleIcon color={iconColor} />;
      case "Consent Log":
        return <ConsentIcon color={iconColor} />;
      case "Data Requests":
        return <DataRequestLogo color={iconColor} />;
      case "Data Breach":
        return <DataBreachLogo color={iconColor} />;
      case "Install Plugin":
        return <InstallationIcon color={iconColor} />;
      case "Integrations":
        return <IntegrationIcon color={iconColor} />;
      case "Privacy Policy":
        return <PrivacyPolicyLogo color={iconColor} />;
      case "Settings":
        return <SettingIcon color={iconColor} />;
      case "Help & Support":
        return <HelpIcon color={iconColor} />;
      default:
        return null;
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const data = await getAllWebsites();
      if (data?.status_code === 200) {
        setLoading(false);
        setAllWebsites(data?.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchWebsiteById = async () => {
    try {
      setLoading(true);
      const user = await fetchUserAttributes();
      const websiteId = user?.website;
      localStorage.setItem("website_id", websiteId);
      const data = await getWebsiteById(websiteId);
      if (data?.status_code === 200) {
        setLoading(false);
        setWebsiteDetails(data?.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites();
    fetchWebsiteById();
    // eslint-disable-next-line
  }, []);

  const handleDeleteClick = (websiteId) => {
    setSelectedWebsiteId(websiteId);
    setOpen(true);
  };

  const licenseData = useSelector((state) => state.license.data);
  const dispatch = useDispatch();
  const websitesUsed = Number(
    licenseData?.subscription_usage_details?.websites_used
  );
  const maxWebsites = Number(
    licenseData?.plan?.plan_attributes?.domains?.limit
  );

  const handleDelete = async (websiteId) => {
    try {
      setLoading(true);
      const response = await deleteWebsite(websiteId);
      if (response.status_code === 200) {
        const updatedWebsites = allWebsites.filter(
          (website) => website.website_id !== websiteId
        );
        setAllWebsites(updatedWebsites);

        const licenseId = licenseData?.subscription?.subscription_id;
        const updatedWebsitesUsed = Math.max(0, websitesUsed - 1); // Ensure it doesn't go below 0
        await updateLicense(licenseId, { websites_used: updatedWebsitesUsed });
        dispatch(updateLicenseUsage({ websites_used: updatedWebsitesUsed }));

        // ✅ Update local state if needed
        let nextWebsite =
          updatedWebsites.length > 0 ? updatedWebsites[0] : null;
        if (nextWebsite) {
          try {
            const user = await getCurrentUser({ bypassCache: true });
            if (user) {
              await updateUserAttributes({
                userAttributes: {
                  website: nextWebsite.website_id.toString(),
                },
              });
            }
          } catch (error) {
            throw error;
          }
          localStorage.setItem("website_id", nextWebsite.website_id);
          setSelectedWebsite(nextWebsite);
          setWebsiteDetails(nextWebsite);
        }
        showSuccessToast("Website deleted successfully!");
        setOpen(false);
        handleClose();
        setLoading(false);
        if (window.location.pathname === "/dashboard") {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedWebsite) {
      setWebsiteDetails(selectedWebsite);
    }
  }, [selectedWebsite]);

  const removeProtocol = (url) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "");
  };

  const isOnlyOneWebsite = allWebsites?.length === 1;

  const isWebsiteLimitExceeded = websitesUsed >= maxWebsites;

  if (loading) {
    <Loader />;
  }

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
          <DataPrivacyLogo
            width="150"
            height="29"
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
              {userInfo?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="500">Hello, {userInfo?.name}</Typography>
            </Box>
            <IconButton onClick={handleClick}>
              <ArrowDownIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfile}
            >
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  setAnchorEl(null); // Close the menu after navigation
                }}
              >
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleLogout(navigate)}>
                Sign Out
              </MenuItem>
            </Menu>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000} // Automatically close after 3 seconds
              onClose={() => setSnackbarOpen(false)} // Close handler
              message={"Successfully logged out!"}
              anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position: Top-right
            />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                fontWeight="400"
                color="textSecondary"
                sx={{ mb: 1 }}
              >
                Websites
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    border: "1px solid #DADADA",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 1, // Adjust the margin right to add some space between the box and the text
                  }}
                >
                  <Typography color="#00B894">
                    {selectedWebsite
                      ? getInitial(removeProtocol(selectedWebsite.domain_name))
                      : getInitial(removeProtocol(websiteDetails?.domain_name))}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={3}
                >
                  <Typography variant="body2" fontWeight="bold" color="#5F5F5F">
                    {selectedWebsite
                      ? removeProtocol(selectedWebsite.domain_name).slice(
                          0,
                          15
                        ) +
                        (removeProtocol(selectedWebsite.domain_name).length > 15
                          ? "..."
                          : "")
                      : removeProtocol(websiteDetails?.domain_name).slice(
                          0,
                          15
                        ) +
                        (removeProtocol(websiteDetails?.domain_name).length > 15
                          ? "..."
                          : "")}
                  </Typography>
                  <IconButton size="small" onClick={handleWebisteClick}>
                    <UnfoldMore />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Menu
              anchorEl={anchorElWebsite}
              open={Boolean(anchorElWebsite)}
              onClose={handleClose}
            >
              {Array.isArray(allWebsites) &&
                (allWebsites || []).map((website) => (
                  <MenuItem
                    key={website.website_id}
                    onClick={() => handleWebsiteSelect(website)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // This will push items to opposite ends
                        width: "100%", // Ensure the Box takes full width
                      }}
                    >
                      {/* Left side content */}
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: 25,
                            height: 25,
                            borderRadius: "50%",
                            border: "1px solid #DADADA",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mr: 1,
                          }}
                        >
                          <Typography color="#00B894">
                            {getInitial(website.domain_name)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="#5F5F5F">
                          {website.domain_name}
                        </Typography>
                      </Box>

                      <Tooltip
                        title="You cannot delete your website. At least one website must remain in your account."
                        disableInteractive
                        open={isOnlyOneWebsite} // Show the tooltip only when there's one website
                        placement="top"
                      >
                        <span>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation(); // This prevents MenuItem selection
                              handleDeleteClick(website.website_id);
                            }}
                            disabled={isOnlyOneWebsite}
                          >
                            <DeleteOutline sx={{ width: "20px", ml: 4 }} />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </MenuItem>
                ))}
              <Divider />

              <MenuItem onClick={handleClose}>
                <Tooltip
                  title={
                    isWebsiteLimitExceeded
                      ? "You have reached the maximum number of allowed websites."
                      : ""
                  }
                  arrow
                >
                  {/* Wrap in span to allow tooltip on disabled button */}
                  <span>
                    <Button
                      color="#525455"
                      sx={{ fontWeight: "700", textTransform: "capitalize" }}
                      onClick={() => navigate("/add-website")}
                      disabled={isWebsiteLimitExceeded}
                    >
                      + Add New Website
                    </Button>
                  </span>
                </Tooltip>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#525455" fontWeight="bold">
                Delete Website
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseOutlined />
              </IconButton>
            </Box>
            <Typography color="#989898">
              Are you sure you want to delete this website? Your website will
              not be cookie consent compliant.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box gap={2} display="flex">
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid #00B894",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
                color="#525455"
                onClick={() => handleDelete(selectedWebsiteId)}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Delete"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid #CECECE",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
                color="#525455"
                onClick={() => setOpen(false)}
              >
                {" "}
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

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
            {[
              "Dashboard",
              "Website Scan",
              "Banner Designer",
              "Vendor Management",
              "Consent Log",
              "Data Requests",
              "Data Breach",
              "Install Plugin",
              "Integrations",
              "Privacy Policy",
            ]
              .filter((item) => {
                const attrs = licenseData?.plan?.plan_attributes;

                // Exclude "Data Breach" if disabled
                if (item === "Data Breach" && attrs?.data_breach === false) {
                  return false;
                }

                // Exclude "Privacy Policy" if disabled
                if (
                  item === "Privacy Policy" &&
                  attrs?.privacy_policy_generator === false
                ) {
                  return false;
                }

                return true; // Keep all others
              })

              .map((item) => (
                <ListItemButton
                  key={item}
                  onClick={() => handleMenuItemClick(item)}
                  selected={selectedItem === item}
                  sx={{
                    backgroundColor:
                      selectedItem === item ? "#E6F4F1" : "transparent",
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
                      color: selectedItem === item ? "#00B894" : "inherit",
                    },
                    "& .MuiListItemText-primary": {
                      color: selectedItem === item ? "#00B894" : "inherit",
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
                            ? "invert(46%) sepia(72%) saturate(2499%) hue-rotate(133deg) brightness(96%) contrast(105%)"
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
                selectedItem === "Settings" ? "#E6F4F1" : "transparent",
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
                color: selectedItem === "Settings" ? "#00B894" : "inherit",
              },
              "& .MuiListItemText-primary": {
                color: selectedItem === "Settings" ? "#00B894" : "inherit",
              },
              borderRadius: "8px",
              mx: 1,
              my: 0.5,
            }}
            onClick={() => handleMenuItemClick("Settings")}
            disabled={userInfo?.zoneinfo === "Org_user"}
          >
            <ListItemIcon
              sx={{
                minWidth: "40px",
                "& svg": {
                  width: "20px",
                  height: "20px",
                  // Apply green filter when selected
                  filter:
                    selectedItem === "Settings"
                      ? "invert(46%) sepia(72%) saturate(2499%) hue-rotate(133deg) brightness(96%) contrast(105%)"
                      : "none",
                },
              }}
            >
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton
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
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
