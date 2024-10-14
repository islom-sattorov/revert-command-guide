import { version } from "../../../package.json";
import styles from "./Version.module.scss";

export const Version = () => {
  return <span className={styles.version}>v{version}</span>;
};
