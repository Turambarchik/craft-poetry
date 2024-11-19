import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import Form, { FormProps } from '../../components/Form';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession({ req });
//   if (!session) {
//     res.statusCode = 403;
//     return { props: { drafts: [] } };
//   }

  const drafts = await prisma.form.findMany({
    where: {
	//TODO After Auth integration
    //author: { email: session.user.email },
	  draft: true,
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: FormProps[];
};

const Drafts: React.FC<Props> = (props) => {
//   const { data: session } = useSession();

//   if (!session) {
//     return (
//       <Layout>
//         <h1>My Drafts</h1>
//         <div>You need to be authenticated to view this page.</div>
//       </Layout>
//     );
//   }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((form) => (
            <div key={form.id}>
              <Form form={form} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;