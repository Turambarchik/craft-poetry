import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Form, { FormProps } from "../components/Form"

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: "1",
      title: "First Sonet",
      content: "Sonet content",
      published: false,
      author: {
        name: "Oleh",
        email: "asd@gmail.com",
      },
    },
  ]
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: FormProps[]
}

const Library: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((form) => (
            <div key={form.id} className="post">
              <Form form={form} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Library
