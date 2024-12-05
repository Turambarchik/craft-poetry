import { Box, Container, Paper, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";

import { FormProps } from "@/components/Form";
import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const form = await prisma.form.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!form) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...form },
  };
};

const FormPage: React.FC<FormProps> = (props) => {
  return (
    <Layout>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {props.published ? props.title : `${props.title} (Draft)`}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            By {props.author?.name || "Unknown author"}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {props.content}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default FormPage;
