import PsychologyIcon from "@mui/icons-material/Psychology";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import React from "react";

import AnimatedAlert from "@/components/common/animated-alert";

import { useAppContext } from "../../../context/appContext";
import { TableProps } from "../types";

const TableDesktop: React.FC<TableProps> = ({
  title,
  content,
  setTitle,
  setContent,
  technicalErrors,
  analysis,
  formContentIsInValid,
  handleGptAnalyze,
  loadingAnalysis,
  semanticErrors,
  technicalWarnings,
  semanticWarnings,
  handleCreate,
  warningModalOpen,
  setWarningModalOpen,
  handleWarningConfirm,
}) => {
  const { t } = useTranslation("table");
  const { selectedForm } = useAppContext();

  const handleAnalyzeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleGptAnalyze();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2, position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {`${t("write_your")} ${selectedForm}`}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Box sx={{ width: "200px" }}>
          <TextField
            label={t("title_label")}
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            aria-label="Haiku Title"
            placeholder={t("placeholder_title") || ""}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={loadingAnalysis || !content}
          onClick={handleAnalyzeClick}
          startIcon={
            loadingAnalysis ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <PsychologyIcon />
            )
          }
          sx={{
            "minWidth": "120px",
            "backgroundColor": "#3f51b5",
            "&:disabled": {
              backgroundColor: "#d3d3d3",
              color: "#ffffff",
            },
          }}
        >
          {loadingAnalysis ? t("analyzing") : t("analyze")}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mt: 4,
        }}
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
              {t("semantic_warnings")}
            </Typography>
            {semanticWarnings.length ? (
              semanticWarnings.map((warning, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!warning}
                  severity="info"
                  sx={{ marginTop: 4 }}
                >
                  {warning}
                </AnimatedAlert>
              ))
            ) : (
              <Alert severity="success">{t("no_semantic_warnings")}</Alert>
            )}
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              {t("semantic_issues")}
            </Typography>
            {semanticErrors.length > 0 ? (
              semanticErrors.map((error, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!error}
                  severity="warning"
                  sx={{ marginTop: 4 }}
                >
                  {error}
                </AnimatedAlert>
              ))
            ) : (
              <Alert severity="success">{t("no_semantic_issues")}</Alert>
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
            placeholder={t("placeholder_content") || ""}
            sx={{ minWidth: 200, fontSize: "1.2rem", minHeight: "200px" }}
          />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              type="button"
              sx={{
                "width": "120px",
                "backgroundColor": "#3f51b5",
                "&:disabled": {
                  backgroundColor: "#d3d3d3",
                  color: "#ffffff",
                },
              }}
              disabled={formContentIsInValid}
              onClick={(e) => {
                e.preventDefault();
                if (
                  technicalWarnings.length > 0 ||
                  semanticWarnings.length > 0
                ) {
                  setWarningModalOpen(true);
                } else {
                  handleCreate();
                }
              }}
            >
              {t("create_button")}
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
          <Box>
            <Typography variant="h6" gutterBottom>
              {t("technical_issues")}
            </Typography>
            {technicalErrors.length > 0 ? (
              technicalErrors.map((error, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!error}
                  severity="error"
                  sx={{ marginTop: 4 }}
                >
                  {error}
                </AnimatedAlert>
              ))
            ) : (
              <Alert severity="success">{t("no_technical_issues")}</Alert>
            )}
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              {t("technical_warnings")}
            </Typography>
            {technicalWarnings.length > 0 ? (
              technicalWarnings.map((warning, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!warning}
                  severity="warning"
                  sx={{ marginTop: 4 }}
                >
                  {warning}
                </AnimatedAlert>
              ))
            ) : (
              <Alert severity="success">{t("no_technical_warnings")}</Alert>
            )}
          </Box>
        </Box>
      </Box>

      {analysis && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="h6">{t("ai_analysis")}</Typography>
          <Typography>{analysis}</Typography>
        </Alert>
      )}

      <Dialog open={warningModalOpen}>
        <DialogTitle>{t("warnings_dialog_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("dialog_warning_text")}
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
            {t("cancel")}
          </Button>
          <Button onClick={handleWarningConfirm} color="primary">
            {t("proceed")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TableDesktop;
