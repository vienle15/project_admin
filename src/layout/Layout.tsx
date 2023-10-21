import React, { ReactElement } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./Layout.module.scss";

function Layout({ children }: { children: ReactElement }) {
  return (
    <div className={styles.layout}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default Layout;
