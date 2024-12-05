import { useMediaQuery, useTheme } from "@mui/material";
import Router from "next/router";
import React, { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import TableDesktop from "@/components/screens/table/TableDesktop";
import TableMobile from "@/components/screens/table/TableMobile";
import { useAppContext } from "@/context/appContext";
import { MOCK_EMAIL } from "@/helpers/constants";
import { poetryValidators } from "@/poetry-validation/index";

interface Errors {
  technical: string[];
  semantic: string[];
  technicalWarnings: string[];
  semanticWarnings: string[];
}

const Table: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Errors>({
    technical: [],
    semantic: [],
    technicalWarnings: [],
    semanticWarnings: [],
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { selectedForm } = useAppContext();
  const [warningModalOpen, setWarningModalOpen] = useState(false);

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

  const validateContent = async (text: string) => {
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
    const {
      technicalErrors,
      semanticErrors,
      technicalWarnings,
      semanticWarnings,
    } = await validate(text);

    setErrors({
      technical: technicalErrors,
      semantic: semanticErrors,
      technicalWarnings,
      semanticWarnings,
    });
  };

  const handleContentChange = async (text: string) => {
    setContent(text);
    await validateContent(text);
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedForm) return;

    const validate = poetryValidators[selectedForm];
    const { valid, technicalWarnings, semanticWarnings } =
      await validate(content);

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
      validateContent("");
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
          handleSubmit={handleSubmit}
          warningModalOpen={warningModalOpen}
          setWarningModalOpen={setWarningModalOpen}
          handleWarningConfirm={handleWarningConfirm}
        />
      ) : (
        <TableDesktop
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={handleContentChange}
          technicalErrors={errors.technical}
          semanticErrors={errors.semantic}
          technicalWarnings={errors.technicalWarnings}
          semanticWarnings={errors.semanticWarnings}
          handleSubmit={handleSubmit}
          warningModalOpen={warningModalOpen}
          setWarningModalOpen={setWarningModalOpen}
          handleWarningConfirm={handleWarningConfirm}
        />
      )}
    </Layout>
  );
};

export default Table;
