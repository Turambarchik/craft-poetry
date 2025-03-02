import LanguageIcon from "@mui/icons-material/Language";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { PoetryForm, SUPPORTED_LANGS } from "utils/constants";
import { transformLangCodeToDisplayName } from "utils/helpers/tranformLangCodeToDisplayName";
import { Language } from "utils/types/globalTypes";

import { useAppContext } from "@/context/appContext";

import Dropdown from "./common/dropdown/dropdown";

const Header: React.FC = () => {
  const router = useRouter();
  const { setSelectedForm } = useAppContext();
  const { t, i18n } = useTranslation("common");

  const handleLanguageChange = (language: string) => {
    const lang = language as Language;
    if (SUPPORTED_LANGS.includes(lang)) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
      router.push(router.pathname, router.asPath, { locale: lang });
    } else {
      console.error("Unsupported language", language);
    }
  };

  const handlePoetryFormChange = (form: PoetryForm) => {
    setSelectedForm(form);
  };

  return (
    <AppBar position="static" color="primary" sx={{ padding: 1 }}>
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* "/library", */}
          {["/", "/drafts"].map((path) => (
            <Button
              key={path}
              component={Link}
              href={path}
              color="inherit"
              sx={{
                ...(router.pathname === path
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      borderRadius: "8px",
                    }
                  : {}),
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              {t(path.slice(1) || "table")}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Dropdown
            title={<LanguageIcon />}
            items={SUPPORTED_LANGS.map((langCode) => ({
              value: langCode,
              label: transformLangCodeToDisplayName(langCode, t),
            }))}
            onSelect={handleLanguageChange}
          />
          <Dropdown
            title={t("poetryForm")}
            items={Object.values(PoetryForm).map((name) => ({
              value: name,
              label: name,
            }))}
            onSelect={(form) => handlePoetryFormChange(form as PoetryForm)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
