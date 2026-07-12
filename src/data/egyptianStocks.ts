export interface StockData {
  code: string;
  name: string;
  logo: string;
  sector: string; // 🆕 القطاع
  index: string; // 🆕 المؤشر (مثال: EGX 30)
  dividendYield: string; // التوزيع
  bookValue: number; // القيمة الدفتارية
  yearlyReturn: string; // 🆕 العائد خلال آخر سنة
  fairValue: number; // القيمة العادلة
}

export const egyptianStocks: StockData[] = [
  {
    code: "FWRY",
    name: "فوري لتكنولوجيا البنوك",
    logo: "/logos/fawry.jpg",
    sector: "تكنولوجيا المدفوعات الرقمية",
    index: "EGX 30",
    dividendYield: "0%",
    bookValue: 1.85,
    yearlyReturn: "+12.4%",
    fairValue: 9.5,
  },
  {
    code: "TMGH",
    name: "مجموعة طلعت مصطفى",
    logo: "/logos/tmg.png",
    sector: "العقارات والمقاولات",
    index: "EGX 30",
    dividendYield: "2.5%",
    bookValue: 18.2,
    yearlyReturn: "+45.2%",
    fairValue: 72.0,
  },
  {
    code: "SWDY",
    name: "السويدي إليكتريك",
    logo: "/logos/elsewedy.png",
    sector: "الطاقة والبنية التحتية",
    index: "EGX 30",
    dividendYield: "4.1%",
    bookValue: 22.4,
    yearlyReturn: "+28.7%",
    fairValue: 55.0,
  },
  {
    code: "COMI",
    name: "البنك التجاري الدولي",
    logo: "/logos/cib.png",
    sector: "البنوك والخدمات المالية",
    index: "EGX 30",
    dividendYield: "5.0%",
    bookValue: 34.1,
    yearlyReturn: "+18.9%",
    fairValue: 95.0,
  },
  {
    code: "EKHO",
    name: "القابضة المصرية الكويتية",
    logo: "/logos/ekh.png",
    sector: "الاستثمارات المالية",
    index: "EGX 30",
    dividendYield: "6.2%",
    bookValue: 0.82,
    yearlyReturn: "-3.5%",
    fairValue: 1.45,
  },
];
