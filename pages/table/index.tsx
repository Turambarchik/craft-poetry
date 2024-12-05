import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Router from "next/router";
import React, { useState } from "react";

import Layout from "../../components/Layout";
import { MOCK_EMAIL } from "../../helpers/constants";

const Table: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = { title, content, type: "haiku", email: MOCK_EMAIL };
    try {
      await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Write Your Poem
        </Typography>
        <Box
          component="form"
          onSubmit={submitData}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            fullWidth
            placeholder="Enter your poem's title"
          />
          <TextField
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={6}
            fullWidth
            placeholder="Write your poem here..."
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!title || !content}
            sx={{
              backgroundColor: "#3f51b5",
              "&:disabled": {
                backgroundColor: "#d3d3d3",
                color: "#ffffff",
              },
            }}
          >
            Create
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Table;
