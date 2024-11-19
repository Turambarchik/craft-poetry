import React, { useState } from 'react';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { MOCK_EMAIL } from '../../helpers/constants';

const Table: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
	e.preventDefault();
	try {
	  const body = { title, content, type: "haiku" ,email: MOCK_EMAIL };
	  await fetch('/api/form', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	  });
	  await Router.push('/drafts');
	} catch (error) {
	  console.error(error);
	}
  };
  

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Table</h1>
		  <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
        </form>
      </div>
    </Layout>
  );
};

export default Table;