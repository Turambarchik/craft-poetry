import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {["/", "/table", "/drafts"].map((path) => (
            <Button
              key={path}
              component={Link}
              href={path}
              color="inherit"
              sx={{
                ...(router.pathname === path
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      borderRadius: "8px",
                    }
                  : {}),
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {path === "/"
                ? "Library"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
