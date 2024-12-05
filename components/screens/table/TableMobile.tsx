import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import { useAppContext } from "../../../context/appContext";

interface TableMobileProps {
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: (text: string) => Promise<void>;
  technicalErrors: string[];
  semanticErrors: string[];
  technicalWarnings: string[];
  semanticWarnings: string[];
  handleSubmit: (e: React.SyntheticEvent) => void;
  warningModalOpen: boolean;
  setWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleWarningConfirm: () => void;
}

const TableMobile: React.FC<TableMobileProps> = ({
  title,
  content,
  setTitle,
  setContent,
  technicalErrors,
  semanticErrors,
  technicalWarnings,
  semanticWarnings,
  handleSubmit,
  warningModalOpen,
  setWarningModalOpen,
  handleWarningConfirm,
}) => {
  const { selectedForm } = useAppContext();

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: "relative" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {`Write your ${selectedForm}`}
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          if (technicalWarnings.length > 0 || semanticWarnings.length > 0) {
            setWarningModalOpen(true);
            e.preventDefault();
          } else {
            handleSubmit(e);
          }
        }}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box sx={{ width: "100%" }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: "0 0 auto", minHeight: "120px" }}>
          <TextField
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={8}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          <Box>
            <Typography variant="h6">Semantic Issues</Typography>
            {semanticErrors.length > 0 ? (
              semanticErrors.map((error, index) => (
                <Alert severity="warning" key={index}>
                  {error}
                </Alert>
              ))
            ) : (
              <Alert severity="success">No semantic issues found.</Alert>
            )}
          </Box>
          <Box>
            <Typography variant="h6">Technical Issues</Typography>
            {technicalErrors.length > 0 ? (
              technicalErrors.map((error, index) => (
                <Alert severity="error" key={index}>
                  {error}
                </Alert>
              ))
            ) : (
              <Alert severity="success">No technical issues found.</Alert>
            )}
          </Box>
          <Box>
            <Typography variant="h6">Warnings</Typography>
            {technicalWarnings.length > 0 ? (
              technicalWarnings.map((warning, index) => (
                <Alert severity="warning" key={index}>
                  {warning}
                </Alert>
              ))
            ) : (
              <Alert severity="success">No technical warnings found.</Alert>
            )}
          </Box>
          <Box>
            <Typography variant="h6">Semantic Warnings</Typography>
            {semanticWarnings.length > 0 ? (
              semanticWarnings.map((warning, index) => (
                <Alert severity="info" key={index}>
                  {warning}
                </Alert>
              ))
            ) : (
              <Alert severity="success">No semantic warnings found.</Alert>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </Box>
      <Dialog open={warningModalOpen}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your haiku contains the following technical warnings:
            <ul>
              {technicalWarnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
              {semanticWarnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWarningModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleWarningConfirm} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TableMobile;
