import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { FormProps } from "../../components/Form";
import { MOCK_EMAIL } from "../../helpers/constants";
import { Typography, Box, Container, Paper } from "@mui/material";

export const getServerSideProps: GetServerSideProps = async () => {
  const form = {
    id: "1",
    title: "First Sonet",
    content: "Sonet content",
    published: false,
    author: { name: "Oleh", email: MOCK_EMAIL },
  };
  return { props: form };
};

const FormPage: React.FC<FormProps> = (props) => (
  <Layout>
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          {props.published ? props.title : `${props.title} (Draft)`}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          By {props.author?.name || "Unknown author"}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant='body1' color='text.primary'>
            {props.content}
          </Typography>
        </Box>
      </Paper>
    </Container>
  </Layout>
);

export default FormPage;
