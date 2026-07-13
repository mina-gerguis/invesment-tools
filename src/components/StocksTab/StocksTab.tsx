'use client';

import { useState } from "react";
import { egyptianStocks, StockData } from "@/data/egyptianStocks";
import Image from "next/image";
import styles from "./StocksTab.module.css";

export default function StocksTab() {
    const [stocksList] = useState<StockData[]>(egyptianStocks);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStock, setSelectedStock] = useState<StockData | null>(null);

    const filteredStocks = stocksList.filter((stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedStock) {
        return (
            <div className={styles.tabContent}>
                <div className={styles.card}>
                    <div className={styles.detailHeader}>
                        <button className={styles.backBtn} onClick={() => setSelectedStock(null)}>➡️ عودة للقائمة</button>
                        <div className={styles.stockIdentityDetail}>
                            <Image
                                src={selectedStock.logo || "https://flagcdn.com/w40/eg.png"}
                                alt={selectedStock.name}
                                width={52}
                                height={52}
                                className={styles.detailImgLogo}
                            />
                            <div className={styles.titleMeta}>
                                <h2>{selectedStock.name}</h2>
                                <span className={styles.badgeCode}>{selectedStock.code}</span>
                            </div>
                        </div>
                    </div>

                    {/* عرض الـ 9 بيانات المطلوبة فقط */}
                    <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>📁 القطاع</span>
                            <span className={styles.detailValue}>{selectedStock.sector}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>📈 المؤشر</span>
                            <span className={styles.detailValue}>{selectedStock.index}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>🎁 التوزيع</span>
                            <span className={styles.detailValue}>{selectedStock.dividendYield}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>📊 القيمة الدفتارية</span>
                            <span className={styles.detailValue}>{selectedStock.bookValue.toFixed(2)} ج.م</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>🔄 العائد خلال آخر سنة</span>
                            <span className={`${styles.detailValue} ${selectedStock.yearlyReturn.startsWith('+') ? styles.greenReturn : styles.redReturn}`}>
                                {selectedStock.yearlyReturn}
                            </span>
                        </div>
                        <div className={styles.detailItem} style={{ gridColumn: '1 / -1', background: 'rgba(255, 152, 0, 0.08)' }}>
                            <span className={styles.detailLabel}>🎯 القيمة العادلة</span>
                            <span className={styles.detailValue} style={{ color: 'var(--orange)', fontSize: '1.3rem' }}>{selectedStock.fairValue.toFixed(2)} ج.م</span>
                            <p
                            style={{
                                color: "var(--muted)",
                                fontSize: "12px"
                            }}
                            >القيمة العادلة للسهم يتم تحديدها من موقع <a 
                            style={{color: "red"}} href="https://arabicstock.com/" target="_blanck">السهم العربي</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tabContent}>
            <div className={styles.card}>
                <div className={styles.ctitle}>البحث في البورصة المصرية</div>
                <div className={styles.searchWrap}>
                    <input
                        type="text"
                        placeholder="ابحث بكود السهم أو اسم الشركة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <span className={styles.searchIcon}>🔍</span>
                </div>
            </div>

            <div className={styles.card} style={{ padding: "10px" }}>
                <div className={styles.ctitle}>قائمة الأسهم المتاحة</div>

                {filteredStocks.length > 0 ? (
                    <div className={styles.stocksListContainer}>
                        {filteredStocks.map((stock) => (
                            <div
                                key={stock.code}
                                onClick={() => setSelectedStock(stock)}
                                className={styles.stockRowCard}
                            >
                                <div className={styles.stockLeftPart}>
                                    <div className={styles.stockLogoContainer}>
                                        <Image
                                            src={stock.logo || "https://flagcdn.com/w40/eg.png"}
                                            alt={stock.name}
                                            width={42}
                                            height={42}
                                            className={styles.stockImgLogo}
                                        />
                                    </div>
                                    <div className={styles.stockMeta}>
                                        <span className={styles.stockRowCode}>{stock.code}</span>
                                        <span className={styles.stockRowName}>{stock.name}</span>
                                    </div>
                                </div>
                                <div className={styles.arrowClick}>➡️</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>❌ لا توجد نتائج مطابقة لبحثك.</div>
                )}
            </div>
        </div>
    );
}