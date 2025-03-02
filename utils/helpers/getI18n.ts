// utils/i18n.ts
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getI18nProps = async (
  locale?: string,
  namespaces: string[] = ["common"]
) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", namespaces)),
  },
});
