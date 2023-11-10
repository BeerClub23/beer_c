"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { usePathname } from "next/navigation";
import "./UserSideBar.scss";
import Link from "next/link";

const UserSideBar = () => {
  const [mobile, setMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setSHow] = useState(false);

  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    width < 480 ? setMobile(true) : setMobile(false);
    const container = document.getElementById("cont");
    if ((width < 480) & !show) {
      container.style.gridTemplateColumns = "auto";
    } else {
      container.style.gridTemplateColumns = "1fr 4fr";
    }
    if (width) return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const pathname = usePathname();
  return (
    <>
      <Box
        sx={{ backgroundColor: "white", boxShadow: "2px 0px 1px #8D8D8D" }}
        className={mobile && "mobile_version-container"}
        id={mobile & !show && "mobile_version-container_showed"}
      >
        {mobile && (
          <Box id="menu_drawer">
            {show ? (
              <CloseIcon
                onClick={() => {
                  setSHow(false);
                }}
              />
            ) : (
              <KeyboardArrowRightIcon
                onClick={() => {
                  setSHow(true);
                }}
              />
            )}
          </Box>
        )}
        <nav
          aria-label="main mailbox folders"
          id="nav_user"
          className={mobile && "mobile_version"}
          style={mobile & !show ? { display: "none" } : {}}
        >
          <List>
            <Link href="/user/adminplan">
              <ListItem
                className={
                  pathname.includes("/user/adminplan") && "active_nav_user"
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <DriveFileRenameOutlineIcon
                      sx={{ color: "black !important" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Administracion plan" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/user/datos-personales">
              <ListItem
                className={
                  pathname.includes("/user/datos-personales") &&
                  "active_nav_user"
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <EditNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Datos personales" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/user/historial">
              <ListItem
                className={
                  pathname.includes("/user/historial") && "active_nav_user"
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Historial" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/user/estadisticas">
              <ListItem
                className={
                  pathname.includes("/user/estadisticas") && "active_nav_user"
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Estadisticas" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
      </Box>
    </>
  );
};

export default UserSideBar;