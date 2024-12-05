import PsychologyIcon from "@mui/icons-material/Psychology";
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

interface TableDesktopProps {
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

const TableDesktop: React.FC<TableDesktopProps> = ({
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

  console.log({ semanticWarnings });
  return (
    <Container maxWidth="lg" sx={{ py: 2, position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {`Write your ${selectedForm}`}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Box sx={{ width: "200px" }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            aria-label="Haiku Title"
            placeholder="Enter your haiku's title"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled
          onClick={(e) => {}}
          startIcon={<PsychologyIcon />}
          sx={{
            width: "120px",
            backgroundColor: "#3f51b5",
            "&:disabled": {
              backgroundColor: "#d3d3d3",
              color: "#ffffff",
            },
          }}
        >
          Analyze
        </Button>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "20%",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Semantic Warnings
            </Typography>
            {semanticWarnings.length ? (
              semanticWarnings.map((warning, index) => (
                <Alert severity="info" key={index}>
                  {warning}
                </Alert>
              ))
            ) : (
              <Alert severity="success">No semantic warnings found.</Alert>
            )}
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Semantic Issues
            </Typography>
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
        </Box>
        <Box flex={2}>
          <TextField
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={8}
            fullWidth
            placeholder="Write your haiku here (3 lines, 5-7-5 syllables)..."
            sx={{ minWidth: 400, fontSize: "1.2rem", minHeight: "200px" }}
          />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={(e) => {
                if (
                  technicalWarnings.length > 0 ||
                  semanticWarnings.length > 0
                ) {
                  setWarningModalOpen(true);
                  e.preventDefault();
                } else {
                  handleSubmit(e);
                }
              }}
              sx={{
                width: "120px",
                backgroundColor: "#3f51b5",
                "&:disabled": {
                  backgroundColor: "#d3d3d3",
                  color: "#ffffff",
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: "20%",
          }}
        >
          <Box flex={1} sx={{ minWidth: "200px" }}>
            <Typography variant="h6" gutterBottom>
              Technical Issues
            </Typography>
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
          <Box flex={1} sx={{ minWidth: "200px" }}>
            <Typography variant="h6" gutterBottom>
              Technical Warnings
            </Typography>
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
        </Box>
      </Box>
      <Dialog open={warningModalOpen}>
        <DialogTitle>Warnings</DialogTitle>
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

export default TableDesktop;
