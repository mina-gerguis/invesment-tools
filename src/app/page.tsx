'use client';

import { useState } from "react";
import HeaderTitle from "../components/header";
import Navigation from "../components/Navigation/Navigation";
import RiskTab from "../components/RiskTab/RiskTab";
import AvgTab from "../components/AvgTab/AvgTab";
import StocksTab from "../components/StocksTab/StocksTab"; // استيراد التبويب الجديد

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("risk");

  return (
    <>
      <HeaderTitle />

      <main className="wrap">
        {activeTab === "risk" && <RiskTab />}
        {activeTab === "avg" && <AvgTab />}
        {activeTab === "egStocks" && <StocksTab />} {/* تشغيل التبويب الجديد هنا */}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}