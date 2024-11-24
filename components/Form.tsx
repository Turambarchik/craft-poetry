import React from "react";
import Router from "next/router";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

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

  const handleClick = () => {
    Router.push(`/form/${form.id}`);
  };

  return (
    <Card
      elevation={3}
      sx={{
        marginBottom: 2,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant='h5' component='h2' gutterBottom>
            {form.title}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            By {authorName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Form;
