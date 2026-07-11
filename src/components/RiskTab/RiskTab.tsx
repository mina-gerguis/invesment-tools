'use client';

import { useState } from "react";
import styles from "./RiskTab.module.css";

export default function RiskTab() {
  const [tradeDir, setTradeDir] = useState<"buy" | "sell">("buy");
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [slPct, setSlPct] = useState<string>("3");
  const [rrrVal, setRrrVal] = useState<number>(1.5);
  const [tradeCapital, setTradeCapital] = useState<string>("");
  
  const [error, setError] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [calculatedData, setCalculatedData] = useState<any>(null);

  const formatNum = (v: number, d = 2) => 
    new Intl.NumberFormat('en-US', { maximumFractionDigits: d, minimumFractionDigits: d }).format(v);

  // حساب البيانات الحية للمعاينة السريعة
  const entry = parseFloat(entryPrice);
  const slP = parseFloat(slPct);
  const showLive = entry > 0 && slP > 0;
  
  const liveSl = showLive ? (tradeDir === 'buy' ? entry * (1 - slP / 100) : entry * (1 + slP / 100)) : 0;
  const liveTp = showLive ? (tradeDir === 'buy' ? entry * (1 + (slP / 100) * rrrVal) : entry * (1 - (slP / 100) * rrrVal)) : 0;

  const handleCalculate = () => {
    setError("");
    const entryNum = parseFloat(entryPrice);
    const slPctNum = parseFloat(slPct);
    const capitalNum = parseFloat(tradeCapital);

    if (!entryNum || entryNum <= 0) return setError('أدخل سعر دخول صحيح');
    if (!slPctNum || slPctNum <= 0) return setError('أدخل نسبة وقف صحيحة');
    if (!capitalNum || capitalNum <= 0) return setError('أدخل السيولة المخصصة');

    const isBuy = tradeDir === 'buy';
    const slPrice = isBuy ? entryNum * (1 - slPctNum / 100) : entryNum * (1 + slPctNum / 100);
    const slDist = Math.abs(entryNum - slPrice);
    const shares = Math.floor(capitalNum / entryNum);
    const lossAmt = shares * slDist;
    const lossPct = (lossAmt / capitalNum) * 100;

    const rrrTargets = [rrrVal, rrrVal * 1.5, rrrVal * 2];
    const tpData = rrrTargets.map((r, i) => {
      const tpP = isBuy ? entryNum * (1 + (slPctNum / 100) * r) : entryNum * (1 - (slPctNum / 100) * r);
      return {
        id: i + 1,
        rrr: r,
        price: tpP,
        profitTotal: shares * Math.abs(tpP - entryNum),
        pct: ((shares * Math.abs(tpP - entryNum)) / capitalNum) * 100
      };
    });

    setCalculatedData({
      entry: entryNum,
      slPrice,
      slPctNum,
      isBuy,
      shares,
      lossAmt,
      lossPct,
      tpData
    });
    setShowResults(true);
  };

  const handleReset = () => {
    setEntryPrice("");
    setSlPct("3");
    setRrrVal(1.5);
    setTradeCapital("");
    setShowResults(false);
    setCalculatedData(null);
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.card}>
        <div className={styles.ctitle}>بيانات الصفقة الفنية</div>
        
        <div className={styles.field}>
          <label>📈 اتجاه المركز المعماري</label>
          <div className={styles.dirToggle}>
            <button className={`${styles.dirBtn} ${tradeDir === "buy" ? styles.onBuy : ""}`} onClick={() => setTradeDir("buy")}>شراء (Long)</button>
            <button className={`${styles.dirBtn} ${tradeDir === "sell" ? styles.onSell : ""}`} onClick={() => setTradeDir("sell")}>بيع (Short)</button>
          </div>
        </div>

        <div className={styles.field}>
          <label>🎯 سعر الدخول المستهدف</label>
          <div className={styles.inpWrap}>
            <input type="number" value={entryPrice} placeholder="0.00" onChange={(e) => setEntryPrice(e.target.value)} />
            <span className={styles.unitBadge}>جنيه</span>
          </div>
        </div>

        <div className={styles.field}>
          <label>🛑 النسبة المئوية لوقف الخسارة</label>
          <div className={styles.inpWrap}>
            <input type="number" value={slPct} placeholder="3" onChange={(e) => setSlPct(e.target.value)} />
            <span className={styles.unitBadge}>%</span>
          </div>
          <div className={styles.chips}>
            {["1", "3", "5"].map((p) => (
              <button key={p} className={`${styles.chip} ${slPct === p ? styles.chipOn : ""}`} onClick={() => setSlPct(p)}>{p}%</button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>🏆 معامل العائد المتوقع (RRR)</label>
          <div className={styles.rrrGrid}>
            {[1, 1.5, 2, 3].map((r) => (
              <button key={r} className={`${styles.rrrBtn} ${rrrVal === r ? styles.rrrOn : ""}`} onClick={() => setRrrVal(r)}>1 : {r}</button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>💰 السيولة النقدية المخصصة للعملية</label>
          <div className={styles.inpWrap}>
            <input type="number" value={tradeCapital} placeholder="100000" onChange={(e) => setTradeCapital(e.target.value)} />
            <span className={styles.unitBadge}>جنيه</span>
          </div>
        </div>

        {error && <div className={styles.errBox}>{error}</div>}
        <button className={styles.calcBtn} onClick={handleCalculate}>🎯 تحليل أبعاد المركز</button>
      </div>

      {/* المعاينة الحية */}
      {showLive && !showResults && (
        <div className={styles.card} style={{ background: "rgba(255, 255, 255, 0.4)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ background: "var(--red-light)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
              <div style={{ fontSize: ".68rem", color: "var(--muted)" }}>🛑 الوقف المتوقع</div>
              <div style={{ fontSize: "1rem", fontWeight: "700", color: "var(--red)" }}>{formatNum(liveSl)} ج</div>
            </div>
            <div style={{ background: "var(--green-light)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
              <div style={{ fontSize: ".68rem", color: "var(--muted)" }}>🎯 Target المبدئي</div>
              <div style={{ fontSize: "1rem", fontWeight: "700", color: "var(--green)" }}>{formatNum(liveTp)} ج</div>
            </div>
          </div>
        </div>
      )}

      {/* النتائج التحليلية المفصلة */}
      {showResults && calculatedData && (
        <>
          <div className={styles.card}>
            <div className={styles.ctitle}>التوزيع السعري الشجري للمركز</div>
            <div className={styles.ladder}>
              <div className={styles.ladderLine}></div>
              {[...calculatedData.tpData].reverse().map((tp: any) => (
                <div className={styles.lrow} key={tp.id}>
                  <div className={styles.lrowDot} style={{ borderColor: "var(--green)" }}></div>
                  <div className={styles.lrowContent}>
                    <span className={`${styles.lrowLabel} ${styles.tp}`}>🎯 مستهدف (TP {tp.id})</span>
                    <span className={styles.lrowVal} style={{ color: "var(--green)" }}>{formatNum(tp.price)} ج</span>
                  </div>
                </div>
              ))}
              <div className={styles.lrow}>
                <div className={styles.lrowDot} style={{ background: "var(--tg-blue)", borderColor: "var(--tg-blue)" }}></div>
                <div className={styles.lrowContent}>
                  <span className={`${styles.lrowLabel} ${styles.entry}`}>🎯 الدخول الأساسي</span>
                  <span className={styles.lrowVal} style={{ color: "var(--tg-blue)" }}>{formatNum(calculatedData.entry)} ج</span>
                </div>
              </div>
              <div className={styles.lrow}>
                <div className={styles.lrowDot} style={{ borderColor: "var(--red)" }}></div>
                <div className={styles.lrowContent}>
                  <div>
                    <span className={`${styles.lrowLabel} ${styles.sl}`}>🛑 جدار الوقف الفني</span>
                    <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                      {calculatedData.isBuy ? 'أسفل' : 'أعلى'} الدخول بـ {calculatedData.slPctNum}%
                    </div>
                  </div>
                  <span className={styles.lrowVal} style={{ color: "var(--red)" }}>{formatNum(calculatedData.slPrice)} ج</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card} style={{ padding: 0, border: "none", background: "transparent", boxShadow: "none" }}>
            <div className={styles.slBox}>
              <div className={styles.slHead}>
                <span className={styles.slBadge}>🛑 حجم المخاطرة المطلقة</span>
                <span style={{ fontSize: ".7rem", color: "var(--muted)" }}>{calculatedData.isBuy ? 'مركز شراء 📈' : 'مركز بيع 📉'}</span>
              </div>
              <div className={styles.slPrice}>{formatNum(calculatedData.slPrice)} جنيه</div>
              <div className={styles.slDetail}>
                <div className={styles.slDItem}><div className={styles.slDVal}>{formatNum(calculatedData.lossAmt)} ج</div><div>المخاطرة مادية</div></div>
                <div className={styles.slDItem}><div className={styles.slDVal}>{calculatedData.lossPct.toFixed(2)}%</div><div>نسبة الوقف</div></div>
                <div className={styles.slDItem}><div className={styles.slDVal}>{formatNum(calculatedData.shares, 0)} سهم</div><div>حجم الأسهم</div></div>
              </div>
            </div>
          </div>

          {calculatedData.tpData.map((tp: any) => (
            <div className={styles.tpCard} key={tp.id}>
              <div className={styles.tpHead}>
                <span className={styles.tpBadge}>🎯 حصد الأرباح (TP {tp.id})</span>
                <span className={styles.tpRrr}>معامل العائد 1 : {formatNum(tp.rrr, 1)}</span>
              </div>
              <div className={styles.tpPrice}>{formatNum(tp.price)} جنيه</div>
              <div className={styles.tpDetail}>
                <div className={styles.tpDItem}><div className={styles.tpDVal} style={{ color: "var(--green)" }}>+{formatNum(tp.profitTotal)} ج</div><div>العائد المتوقع</div></div>
                <div className={styles.tpDItem}><div className={styles.tpDVal} style={{ color: "var(--green)" }}>+{tp.pct.toFixed(2)}%</div><div>نمو المحفظة</div></div>
                <div className={styles.tpDItem}><div className={styles.tpDVal}>{formatNum(Math.abs(tp.price - calculatedData.entry))} ج</div><div>ربح السهم</div></div>
              </div>
            </div>
          ))}

          <div className={styles.card}>
            <div className={styles.ctitle}>الملخص التحليلي والنهائي</div>
            <div className={styles.sumRow}><span className={styles.sk}>💰 السيولة المخصصة</span><span className={styles.sv} style={{ color: "var(--tg-blue)" }}>{formatNum(parseFloat(tradeCapital))} ج</span></div>
            <div className={styles.sumRow}><span className={styles.sk}>📦 الكمية المطلوبة</span><span className={styles.sv}>{formatNum(calculatedData.shares, 0)} سهم</span></div>
            <div className={styles.sumRow}><span className={styles.sk}>💸 المخاطرة المالية الفعلية</span><span className={styles.sv} style={{ color: "var(--red)" }}>{formatNum(calculatedData.lossAmt)} ج ({calculatedData.lossPct.toFixed(2)}%)</span></div>
          </div>

          <button className={styles.resetBtn} onClick={handleReset}>🔄 تفريغ البيانات وحساب مركز جديد</button>
        </>
      )}
    </div>
  );
}