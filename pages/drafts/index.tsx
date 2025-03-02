import { Box, Container, Paper, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import { getI18nProps } from "utils/helpers/getI18n";

import Form, { FormProps } from "@/components/Form";
import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const drafts = await prisma.form.findMany({
    where: {
      draft: true,
      published: false,
    },
    include: {
      author: { select: { name: true } },
    },
  });

  const i18nProps = await getI18nProps(locale ?? "en", ["common"]);

  return {
    props: {
      drafts,
      ...i18nProps.props,
    },
  };
};

type Props = {
  drafts: FormProps[];
};

const Drafts: React.FC<Props> = ({ drafts }) => (
  <Layout>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Drafts
      </Typography>
      {drafts.length > 0 ? (
        <Box
          component="main"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          {drafts.map((form) => (
            <Paper
              elevation={3}
              key={form.id}
              sx={{
                "p": 2,
                "mb": 3,
                "borderRadius": 2,
                "boxShadow": "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
                "transition": "all 0.3s ease-in-out",
              }}
            >
              <Form form={form} />
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No drafts available.
        </Typography>
      )}
    </Container>
  </Layout>
);

export default Drafts;
