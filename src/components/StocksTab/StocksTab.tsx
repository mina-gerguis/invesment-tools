'use client';

import { useState } from "react";
import { egyptianStocks, StockData } from "@/data/egyptianStocks";
import styles from "./StocksTab.module.css";

export default function StocksTab() {
    const [searchTerm, setSearchTerm] = useState("");

    // تصفية الأسهم بناءً على البحث بكود السهم أو الاسم
    const filteredStocks = egyptianStocks.filter((stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.tabContent}>
            {/* شريط البحث الذكي */}
            <div className={styles.card}>
                <div className={styles.ctitle}>البحث في البورصة المصرية</div>
                <div className={styles.searchWrap}>
                    <input
                        type="text"
                        placeholder="ابحث بكود السهم (مثال: FWRY) أو اسم الشركة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <span className={styles.searchIcon}>🔍</span>
                </div>
            </div>

            {/* عرض البيانات مثل جوجل شيت */}
            <div className={styles.card} style={{ padding: "12px", overflowX: "auto" }}>
                <div className={styles.ctitle}>لوحة القيم التحليلية والمؤشرات</div>

                {filteredStocks.length > 0 ? (
                    <table className={styles.stocksTable}>
                        <thead>
                            <tr>
                                <th>الكود</th>
                                <th>الشركة</th>
                                <th>الدفترية</th>
                                <th>العادلة</th>
                                <th>مكرر الأرباح</th>
                                <th>ربحية السهم</th>
                                <th>التوزيعات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStocks.map((stock) => (
                                <tr key={stock.code}>
                                    <td className={styles.stockCode}>{stock.code}</td>
                                    <td className={styles.stockName}>{stock.name}</td>
                                    <td>{stock.bookValue.toFixed(2)} ج</td>
                                    <td className={styles.fairValue}>{stock.fairValue.toFixed(2)} ج</td>
                                    <td>{stock.peRatio}x</td>
                                    <td className={styles.greenText}>{stock.eps.toFixed(2)} ج</td>
                                    <td>{stock.dividendYield}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className={styles.noResults}>❌ لا توجد نتائج مطابقة لبحثك.</div>
                )}
            </div>
        </div>
    );
}