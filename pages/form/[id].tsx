import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { FormProps } from "../../components/Form"
import { MOCK_EMAIL } from "../../helpers/constants"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const form =  {
	id: "1",
	title: "First Sonet",
	content: "Sonet content",
	published: false,
	author: {
	  name: "Oleh",
	  email: MOCK_EMAIL,
	},
  }
  return {
    props: form,
  }
}

const Form: React.FC<FormProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
      </div>
    </Layout>
  )
}

export default Form
