import { Box, Container, Paper, Typography } from "@mui/material";
import Layout from "components/Layout";
import { GetStaticProps } from "next";
import React from "react";

import Form, { FormProps } from "@/components/Form";

import prisma from "../lib/prisma";

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

const Library: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Library</h1>
        <main>
          {props.libraryContent.map((form) => (
            <div key={form.id} className="post">
              <Form form={form} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Library;
