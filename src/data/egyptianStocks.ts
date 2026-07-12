export interface StockData {
  code: string;
  name: string;
  bookValue: number;      // القيمة الدفتارية
  fairValue: number;      // القيمة العادلة
  peRatio: number;        // مكرر الأرباح
  eps: number;            // ربحية السهم
  dividendYield: string;  // توزيع الأرباح
}

export const egyptianStocks: StockData[] = [
  { code: "FWRY", name: "فوري لتكنولوجيا البنوك", bookValue: 1.85, fairValue: 9.50, peRatio: 28.4, eps: 0.22, dividendYield: "0%" },
  { code: "TMGH", name: "مجموعة طلعت مصطفى", bookValue: 18.20, fairValue: 72.00, peRatio: 18.1, eps: 3.10, dividendYield: "2.5%" },
  { code: "SWDY", name: "السويدي إليكتريك", bookValue: 22.40, fairValue: 55.00, peRatio: 12.3, eps: 3.80, dividendYield: "4.1%" },
  { code: "COMI", name: "البنك التجاري الدولي", bookValue: 34.10, fairValue: 95.00, peRatio: 9.8, eps: 8.50, dividendYield: "5.0%" },
  { code: "EKHO", name: "القابضة المصرية الكويتية", bookValue: 0.82, fairValue: 1.45, peRatio: 8.5, eps: 0.14, dividendYield: "6.2%" },
];