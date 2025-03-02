import { useMediaQuery, useTheme } from "@mui/material";
import { i18n as I18nType, TFunction } from "i18next";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MOCK_EMAIL } from "utils/constants";
import type { Language, PoetryErrors } from "utils/types/globalTypes";

import Layout from "@/components/Layout";
import TableDesktop from "@/components/screens/table/TableDesktop";
import TableMobile from "@/components/screens/table/TableMobile";
import { useAppContext } from "@/context/appContext";
import { poetryValidators } from "@/poetry-validation/index";

export const TablePage: React.FC = () => {
  const { t, i18n } = useTranslation("validation");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<PoetryErrors>({
    technical: [],
    semantic: [],
    technicalWarnings: [],
    semanticWarnings: [],
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { selectedForm } = useAppContext();
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [formContentIsInValid, setFormContentIsInValid] = useState(true);
  const resetData = () => {
    setTitle("");
    setContent("");
    setErrors({
      technical: [],
      semantic: [],
      technicalWarnings: [],
      semanticWarnings: [],
    });
  };

  const validateContent = async (
    text: string,
    t: TFunction,
    i18n: I18nType
  ) => {
    if (!text.trim() || !selectedForm) {
      setErrors({
        technical: [],
        semantic: [],
        technicalWarnings: [],
        semanticWarnings: [],
      });
      return;
    }
    const validate = poetryValidators[selectedForm];
    const result = await validate(text, t, i18n);
    setFormContentIsInValid(!result.valid);
    setErrors({
      technical: result.technicalErrors,
      semantic: result.semanticErrors,
      technicalWarnings: result.technicalWarnings,
      semanticWarnings: result.semanticWarnings,
    });
  };

  const handleContentChange = async (text: string) => {
    setContent(text);
    await validateContent(text, t, i18n);
  };

  const handleWarningConfirm = async () => {
    setWarningModalOpen(false);
    const body = { title, content, type: selectedForm, email: MOCK_EMAIL };
    try {
      await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGptAnalyze = async () => {
    if (!content || !content.trim()) return;
    setLoadingAnalysis(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: content,
          lang: (i18n.language || "en") as Language,
        }),
      });

      const data = await response.json();
      setErrors({
        technical: data.technicalErrors || [],
        semantic: data.semanticErrors || [],
        technicalWarnings: data.technicalWarnings || [],
        semanticWarnings: data.semanticWarnings || [],
      });
      setAnalysis(data.suggestions || "No suggestions provided.");
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis("Error analyzing haiku.");
    } finally {
      setLoadingAnalysis(false);
    }
  };
  const handleCreate = async () => {
    if (!selectedForm) return;
    const validate = poetryValidators[selectedForm];
    const { valid, technicalWarnings, semanticWarnings } = await validate(
      content,
      t,
      i18n
    );
    if (technicalWarnings.length > 0 || semanticWarnings.length > 0) {
      setWarningModalOpen(true);
      return;
    }
    if (!valid) return;
    const body = { title, content, type: selectedForm, email: MOCK_EMAIL };
    try {
      await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    resetData();
    if (selectedForm) {
      validateContent("", t, i18n);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedForm]);

  return (
    <Layout>
      {isMobile ? (
        <TableMobile
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={handleContentChange}
          technicalErrors={errors.technical}
          semanticErrors={errors.semantic}
          technicalWarnings={errors.technicalWarnings}
          semanticWarnings={errors.semanticWarnings}
          handleCreate={handleCreate}
          handleGptAnalyze={handleGptAnalyze}
          analysis={analysis}
          loadingAnalysis={loadingAnalysis}
          warningModalOpen={warningModalOpen}
          formContentIsInValid={formContentIsInValid}
          setWarningModalOpen={setWarningModalOpen}
          handleWarningConfirm={handleWarningConfirm}
        />
      ) : (
        <TableDesktop
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={handleContentChange}
          formContentIsInValid={formContentIsInValid}
          technicalErrors={errors.technical}
          semanticErrors={errors.semantic}
          technicalWarnings={errors.technicalWarnings}
          semanticWarnings={errors.semanticWarnings}
          handleCreate={handleCreate}
          handleGptAnalyze={handleGptAnalyze}
          analysis={analysis}
          loadingAnalysis={loadingAnalysis}
          warningModalOpen={warningModalOpen}
          setWarningModalOpen={setWarningModalOpen}
          handleWarningConfirm={handleWarningConfirm}
        />
      )}
    </Layout>
  );
};
