import Layout from "components/Layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { getI18nProps } from "utils/helpers/getI18n";

import Form, { FormProps } from "@/components/Form";
import prisma from "@/lib/prisma";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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

  const i18nProps = await getI18nProps(locale ?? "en", ["common"]);

  return {
    props: {
      libraryContent,
      ...i18nProps.props,
    },
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
