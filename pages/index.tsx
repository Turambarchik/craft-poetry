import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Form, { FormProps } from "../components/Form";
import prisma from "../lib/prisma";
import { Container, Typography, Box, Paper } from "@mui/material";

export const getStaticProps: GetStaticProps = async () => {
  const libraryContent = await prisma.form.findMany({
    where: {
      draft: false,
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { libraryContent },
    revalidate: 10,
  };
};

type Props = {
  libraryContent: FormProps[];
};

const Library: React.FC<Props> = ({ libraryContent }) => (
  <Layout>
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Public Library
      </Typography>
      <Box
        component='main'
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 2,
        }}
      >
        {libraryContent.map((form) => (
          <Paper
            key={form.id}
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Form form={form} />
          </Paper>
        ))}
      </Box>
    </Container>
  </Layout>
);

export default Library;
