import React from "react";
import Router from "next/router";

export type FormProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Form: React.FC<{ form: FormProps }> = ({ form }) => {
  const authorName = form.author ? form.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${form.id}`)}>
      <h2>{form.title}</h2>
      <small>By {authorName}</small>
    </div>
  );
};

export default Form;
