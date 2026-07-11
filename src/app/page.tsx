'use client';

import { useState } from "react";
import HeaderTitle from "@/components/header";
import Navigation from "@/components/Navigation/Navigation";
import RiskTab from "@/components/RiskTab/RiskTab";
import AvgTab from "@/components/AvgTab/AvgTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("risk");

  return (
    <>
      {/* رأس الصفحة الزجاجي */}
      <HeaderTitle />

      {/* الحاوية المركزية للتطبيق */}
      <main className="wrap">
        {activeTab === "risk" && <RiskTab />}
        {activeTab === "avg" && <AvgTab />}
      </main>

      {/* شريط التنقل السفلي العائم */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}