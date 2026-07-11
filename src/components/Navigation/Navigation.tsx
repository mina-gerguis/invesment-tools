import styles from "./Navigation.module.css";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.tabsNav}>
        <button 
          className={`${styles.tabBtn} ${activeTab === "risk" ? styles.active : ""}`}
          onClick={() => handleTabChange("risk")}
        >
          <span className={styles.navIcon}>🎯</span>
          <span className={styles.navText}>إدارة المخاطر</span>
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === "avg" ? styles.active : ""}`}
          onClick={() => handleTabChange("avg")}
        >
          <span className={styles.navIcon}>📊</span>
          <span className={styles.navText}>حساب المتوسط</span>
        </button>
      </div>
    </div>
  );
}