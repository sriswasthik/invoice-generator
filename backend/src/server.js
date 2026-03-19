const express = require("express");
const cors = require("cors");

const invoiceRoutes = require("./routes/invoiceRoutes");
const clientRoutes = require("./routes/clientRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Invoice Platform API Running");
});

app.use("/api/invoices", invoiceRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});