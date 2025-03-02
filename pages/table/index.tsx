import { GetServerSideProps } from "next";
import { getI18nProps } from "utils/helpers/getI18n";

import { TablePage } from "../../components/screens/table/TablePage";

export const getServerSideProps: GetServerSideProps = async ({ locale }) =>
  getI18nProps(locale ?? "en", ["common", "table", "validation"]);

export default TablePage;
