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

const TableMobile: React.FC<TableProps> = ({
  title,
  content,
  setTitle,
  setContent,
  technicalErrors,
  analysis,
  handleGptAnalyze,
  loadingAnalysis,
  semanticErrors,
  technicalWarnings,
  semanticWarnings,
  handleCreate,
  warningModalOpen,
  formContentIsInValid,
  setWarningModalOpen,
  handleWarningConfirm,
}) => {
  const { t } = useTranslation("table");
  const { selectedForm } = useAppContext();

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: "relative" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {`${t("write_your")} ${selectedForm}`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ width: "100%" }}>
          <TextField
            label={t("title_label")}
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            placeholder={t("placeholder_title") || ""}
          />
        </Box>
        <Box sx={{ flex: "0 0 auto", minHeight: "120px" }}>
          <TextField
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={5}
            fullWidth
            placeholder={t("placeholder_content") || ""}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          <Box>
            <Typography variant="h6">{t("semantic_issues")}</Typography>
            {semanticErrors.length > 0 ? (
              semanticErrors.map((error, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!error}
                  severity="warning"
                  sx={{ mt: 4 }}
                >
                  {error}
                </AnimatedAlert>
              ))
            ) : (
              <AnimatedAlert show severity="success" sx={{ mt: 4 }}>
                {t("no_semantic_issues")}
              </AnimatedAlert>
            )}
          </Box>
          <Box>
            <Typography variant="h6">{t("technical_issues")}</Typography>
            {technicalErrors.length > 0 ? (
              technicalErrors.map((error, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!error}
                  severity="error"
                  sx={{ mt: 4 }}
                >
                  {error}
                </AnimatedAlert>
              ))
            ) : (
              <AnimatedAlert show severity="success" sx={{ mt: 4 }}>
                {t("no_technical_issues")}
              </AnimatedAlert>
            )}
          </Box>
          <Box>
            <Typography variant="h6">{t("technical_warnings")}</Typography>
            {technicalWarnings.length > 0 ? (
              technicalWarnings.map((warning, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!warning}
                  severity="warning"
                  sx={{ mt: 4 }}
                >
                  {warning}
                </AnimatedAlert>
              ))
            ) : (
              <AnimatedAlert show severity="success" sx={{ mt: 4 }}>
                {t("no_technical_warnings")}
              </AnimatedAlert>
            )}
          </Box>
          <Box>
            <Typography variant="h6">{t("semantic_warnings")}</Typography>
            {semanticWarnings.length > 0 ? (
              semanticWarnings.map((warning, index) => (
                <AnimatedAlert
                  key={index}
                  show={!!warning}
                  severity="info"
                  sx={{ mt: 4 }}
                >
                  {warning}
                </AnimatedAlert>
              ))
            ) : (
              <AnimatedAlert show severity="success" sx={{ mt: 4 }}>
                {t("no_semantic_warnings")}
              </AnimatedAlert>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={loadingAnalysis || !content}
          onClick={handleGptAnalyze}
          startIcon={
            loadingAnalysis ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <PsychologyIcon />
            )
          }
          sx={{
            "width": "120px",
            "backgroundColor": "#3f51b5",
            "&:disabled": {
              backgroundColor: "#d3d3d3",
              color: "#ffffff",
            },
          }}
        >
          {loadingAnalysis ? t("analyzing") : t("analyze")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={formContentIsInValid}
          onClick={(e) => {
            e.preventDefault();
            if (technicalWarnings.length > 0 || semanticWarnings.length > 0) {
              setWarningModalOpen(true);
            } else {
              handleCreate();
            }
          }}
        >
          {t("create_button")}
        </Button>
      </Box>
      {analysis && (
        <AnimatedAlert show severity="info" sx={{ mt: 3 }}>
          <Typography variant="h6">{t("ai_analysis")}</Typography>
          <Typography>{analysis}</Typography>
        </AnimatedAlert>
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

export default TableMobile;
