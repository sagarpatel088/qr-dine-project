import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

function QRCodePage() {
  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  const downloadQR = (table) => {
    const node = document.getElementById(`qr-${table}`);

    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Table-${table}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📱 Restaurant QR Codes</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {tables.map((table) => (
          <div
            key={table}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h2>Table {table}</h2>

            <div
              id={`qr-${table}`}
              style={{
                background: "#fff",
                padding: "15px",
                display: "inline-block",
              }}
            >
              <QRCode
                value={`https://qr-dine-project.vercel.app/table/${table}`}
                size={180}
              />
            </div>

            <br />
            <br />

            <button onClick={() => downloadQR(table)}>
              Download QR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRCodePage;