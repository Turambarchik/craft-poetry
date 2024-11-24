import { Box, Container } from "@mui/material";
import Header from "./Header";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout: React.FC<Props> = ({ children }) => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Header />
    <Container component='main' maxWidth='lg' sx={{ flexGrow: 1, py: 4 }}>
      {children}
    </Container>
    <Box
      component='footer'
      sx={{
        py: 2,
        textAlign: "center",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      © {new Date().getFullYear()} Poetry Helper App
    </Box>
  </Box>
);

export default Layout;
