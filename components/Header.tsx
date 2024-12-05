import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useAppContext } from "@/context/appContext";
import { PoetryForm } from "@/helpers/constants";

import Dropdown from "./common/dropdown/dropdown";

const Header: React.FC = () => {
  const router = useRouter();
  const { setSelectedForm } = useAppContext();

  const handleLanguageChange = (language: string) => {
    localStorage.setItem("language", language);
    console.log(`Language changed to: ${language}`);
  };

  const handlePoetryFormChange = (form: PoetryForm) => {
    setSelectedForm(form);
    console.log(`Selected poetry form: ${form}`);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Dropdown
            title="Language"
            items={["en", "es", "fr", "de"]}
            onSelect={handleLanguageChange}
          />
          <Dropdown
            title="Poetry Form"
            items={Object.values(PoetryForm)}
            onSelect={(form) => handlePoetryFormChange(form as PoetryForm)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
