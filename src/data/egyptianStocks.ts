export interface StockData {
  code: string;
  name: string;
  logo: string;
  sector: string; // 🆕 القطاع
  industry: string;
  index: string; // 🆕 المؤشر (مثال: EGX 30)
  dividendYield: string; // التوزيع
  bookValue: number; // القيمة الدفتارية
  yearlyReturn: string; // 🆕 العائد خلال آخر سنة
  fairValue: number; // القيمة العادلة
}

export const egyptianStocks: StockData[] = [
  {
    code: "MFCP",
    name: "مصر لإنتاج الأسمدة - موبكو",
    logo: "/logos/mfcp.png",
    sector: "الموارد الاساسية",
    industry: "الأسمدة",
    index: "EGX30",
    dividendYield: "6.82%",
    bookValue: 16.67,
    yearlyReturn: "+52.3%",
    fairValue: 54.51,
  },
  {
    code: "ARCC",
    name: "العربية للأسمنت",
    logo: "/logos/arcc.png",
    sector: "السلع الصناعية",
    industry: "مواد البناء - الأسمنت",
    index: "EGX30",
    dividendYield: "5.32%",
    bookValue: 12.38,
    yearlyReturn: "+99.89%",
    fairValue: 63.95,
  },
  {
    code: "MICH",
    name: "مصر لصناعة الكيماويات",
    logo: "/logos/mich.jpg",
    sector: "الموارد الأساسية",
    industry: "الكيماويات",
    index: "غير متاح",
    dividendYield: "10.53%",
    bookValue: 11.09,
    yearlyReturn: "+25.38%",
    fairValue: 43.70,
  },
  {
    code: "EGAL",
    name: "مصر  للالومنيوم",
    logo: "/logos/egal.png",
    sector: "المواردالأساسية",
    industry: "المعادن والتعدين",
    index: "EGX30",
    dividendYield: "2.75%",
    bookValue: 58.40,
    yearlyReturn: "+111.24%",
    fairValue: 319,
  },
  {
    code: "ENGC",
    name: "الصناعات الهندسية المعمارية (ايكون)",
    logo: "/logos/engc.png",
    sector: "السلع الصناعية",
    industry: "مقاولات و انشاءات هندسية",
    index: "EGX70 EWI",
    dividendYield: "2.93%",
    bookValue: 19.96,
    yearlyReturn: "+44.88%",
    fairValue: 42.49,
  },
];


// {
//     code: "",
//     name: "",
//     logo: "/logos/",
//     sector: "",
//     industry: "",
//     index: "EGX ",
//     dividendYield: "",
//     bookValue: ,
//     yearlyReturn: "",
//     fairValue: ,
//   },