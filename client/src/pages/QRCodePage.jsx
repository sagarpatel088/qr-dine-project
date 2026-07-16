import QRCode from "react-qr-code";

function QRCodePage() {

  const tables = [1,2,3,4,5,6];

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>🍽️ QR Dine - Table QR Codes</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {tables.map((table) => (

          <div
            key={table}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,.15)"
            }}
          >
            <h2>Table {table}</h2>

            <QRCode
              value={`http://localhost:5173/table/${table}`}
              size={180}
            />

            <p
              style={{
                marginTop: "10px",
                fontSize: "14px"
              }}
            >
              Scan to Order
            </p>

          </div>

        ))}
      </div>

    </div>
  );
}

export default QRCodePage;