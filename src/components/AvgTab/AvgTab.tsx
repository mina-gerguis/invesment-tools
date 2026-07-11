'use client';

import { useState } from "react";
import styles from "./AvgTab.module.css";

export default function AvgTab() {
  const [currShares, setCurrShares] = useState("");
  const [currAvg, setCurrAvg] = useState("");
  const [newCash, setNewCash] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [commPct, setCommPct] = useState("0.50");

  const formatNum = (v: number, d = 2) => 
    new Intl.NumberFormat('en-US', { maximumFractionDigits: d, minimumFractionDigits: d }).format(v);

  // منطق الحساب اللحظي (Reactive Logic)
  const cShares = parseFloat(currShares) || 0;
  const cAvg = parseFloat(currAvg) || 0;
  const nCash = parseFloat(newCash) || 0;
  const nPrice = parseFloat(newPrice) || 0;
  const cPct = parseFloat(commPct) || 0;

  let hasResults = nCash > 0 && nPrice > 0;

  // الحسابات الرياضية الفنية
  const commFactor = cPct / 100;
  const effectiveNewPrice = nPrice * (1 + commFactor);
  const addedShares = hasResults ? Math.floor(nCash / effectiveNewPrice) : 0;
  const actualSharesCost = addedShares * nPrice;
  const totalCommFee = actualSharesCost * commFactor;
  const actualTotalNewCost = actualSharesCost + totalCommFee;

  const oldTotalCost = cShares * cAvg;
  const totalShares = cShares + addedShares;
  const totalCost = oldTotalCost + actualTotalNewCost;
  const finalNewAvg = totalShares > 0 ? totalCost / totalShares : 0;

  // حساب نسبة التغير في المتوسط
  let diffPct = 0;
  if (cAvg > 0 && finalNewAvg > 0) {
    diffPct = ((finalNewAvg - cAvg) / cAvg) * 100;
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.card}>
        <div className={styles.ctitle}>المراكز الحالية في المحفظة</div>
        <div className={styles.field}>
          <label>📦 إجمالي الأسهم الحالية المملوكة</label>
          <div className={styles.inpWrap}>
            <input type="number" value={currShares} placeholder="0" onChange={(e) => setCurrShares(e.target.value)} />
            <span className={styles.unitBadge}>سهم</span>
          </div>
        </div>
        <div className={styles.field}>
          <label>💵 متوسط سعر الشراء الحالي للأسهم</label>
          <div className={styles.inpWrap}>
            <input type="number" value={currAvg} placeholder="0.00" onChange={(e) => setCurrAvg(e.target.value)} />
            <span className={styles.unitBadge}>جنيه</span>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.ctitle}>طلب الشراء الجديد والعمولات</div>
        <div className={styles.field}>
          <label>💰 السيولة النقدية المخصصة للشراء الجديد</label>
          <div className={styles.inpWrap}>
            <input type="number" value={newCash} placeholder="0" onChange={(e) => setNewCash(e.target.value)} />
            <span className={styles.unitBadge}>جنيه</span>
          </div>
          <div className={styles.chips}>
            {[10000, 25000, 50000].map((amt) => (
              <button key={amt} className={styles.chip} onClick={() => setNewCash(amt.toString())}>
                {amt / 1000} آلاف
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>🏷️ سعر تنفيذ السهم الجديد</label>
          <div className={styles.inpWrap}>
            <input type="number" value={newPrice} placeholder="0.00" onChange={(e) => setNewPrice(e.target.value)} />
            <span className={styles.unitBadge}>جنيه</span>
          </div>
        </div>

        <div className={styles.field}>
          <label>🧾 نسبة عمولة شركة التداول والرسوم</label>
          <div className={styles.inpWrap}>
            <input type="number" value={commPct} placeholder="0.50" onChange={(e) => setCommPct(e.target.value)} />
            <span className={styles.unitBadge}>%</span>
          </div>
          <div className={styles.chips}>
            {["0.20", "0.50", "0.70"].map((pct) => (
              <button key={pct} className={`${styles.chip} ${commPct === pct ? styles.chipOn : ""}`} onClick={() => setCommPct(pct)}>
                {pct}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card} style={{ background: "rgba(255, 255, 255, 0.85)" }}>
        <div className={styles.ctitle}>المتوسط الحسابي الجديد المحدث للمحفظة</div>
        
        <div className={styles.avgResultGrid}>
          <div className={styles.avgMainCard}>
            <div className={styles.avgLbl} style={{ color: "var(--tg-blue)", fontWeight: "700" }}>🎯 المتوسط الإجمالي المعدل والجديد</div>
            <div className={styles.avgVal} style={{ fontSize: "1.5rem", color: "var(--tg-blue)" }}>
              {hasResults ? `${formatNum(finalNewAvg)} جنيه` : "—"}
            </div>
            {hasResults && cAvg > 0 && (
              <div style={{ fontSize: "0.75rem", marginTop: "4px", fontWeight: "700", color: diffPct < 0 ? "var(--green)" : "var(--orange)" }}>
                {diffPct < 0 
                  ? `📉 تم خفض المتوسط بنسبة ${Math.abs(diffPct).toFixed(2)}% (تحسين ممتاز)` 
                  : `🔺 ارتفع المتوسط بنسبة ${diffPct.toFixed(2)}% (تعزيز مركز)`}
              </div>
            )}
          </div>

          <div className={styles.avgSubCard}>
            <div className={styles.avgLbl}>📦 الأسهم الجديدة المكتسبة</div>
            <div className={styles.avgVal} style={{ color: "var(--green)" }}>{hasResults ? formatNum(addedShares, 0) + " سهم" : "—"}</div>
          </div>

          <div className={styles.avgSubCard}>
            <div className={styles.avgLbl}>📊 إجمالي أسهم المحفظة بالكامل</div>
            <div className={styles.avgVal}>{totalShares > 0 ? formatNum(totalShares, 0) + " سهم" : "—"}</div>
          </div>

          <div className={styles.avgSubCard}>
            <div className={styles.avgLbl}>💸 إجمالي قيمة العمولة المستقطعة</div>
            <div className={styles.avgVal} style={{ fontSize: "0.9rem", color: "var(--red)" }}>{hasResults ? formatNum(totalCommFee) + " ج" : "—"}</div>
          </div>

          <div className={styles.avgSubCard}>
            <div className={styles.avgLbl}>💳 إجمالي القيمة النقدية للمركز</div>
            <div className={styles.avgVal} style={{ fontSize: "0.9rem", color: "var(--text)" }}>{totalCost > 0 ? formatNum(totalCost) + " ج" : "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}