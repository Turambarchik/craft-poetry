import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Router from "next/router";
import React from "react";

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
          <Typography variant="h5" component="h2" gutterBottom>
            {form.title}
          </Typography>
          <Box
            sx={{
              maxHeight: 300,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
            }}
          >
            <Typography
              variant="body1"
              color="textPrimary"
              gutterBottom
              sx={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {form.content}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            By {authorName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Form;
