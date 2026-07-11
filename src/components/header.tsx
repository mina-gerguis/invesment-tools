import Image from "next/image";
export default function HeaderTitle() {
    return (
        <div
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px) saturate(190%)",
                WebkitBackdropFilter: "blur(20px) saturate(190%)",
                borderBottom: "1px solid var(--glass-border)",
                padding: "16px",
                position: "sticky",
                top: 0,
                zIndex: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Image
                src="/thndr-coin1-min.png"
                width={30}
                height={30}
                alt="Thndr Coin"
            />
            <h1
                style={{
                    fontFamily: "Hagrid",
                    fontSize: "1.15rem",
                    fontWeight: "900",
                    margin: "0 10px",
                    color: "var(--text)",
                }}
            >
                مركز الاستثمار
            </h1>
        </div >
    );
}