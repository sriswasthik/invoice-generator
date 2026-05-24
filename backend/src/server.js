require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

// =====================================
// ROUTES
// =====================================

const authRoutes =
  require("./routes/authRoutes");

const clientRoutes =
  require("./routes/clientRoutes");

const invoiceRoutes =
  require("./routes/invoiceRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

// =====================================
// APP
// =====================================

const app =
  express();

// =====================================
// MIDDLEWARE
// =====================================

// CORS

app.use(

  cors({

    origin: "*",

    credentials: true
  })
);

// JSON parser

app.use(
  express.json()
);

// =====================================
// ROOT
// =====================================

app.get(
  "/",
  (req, res) => {

    res.status(200).json({

      message:
        "InvoiceOS API Running"

    });
  }
);

// =====================================
// API ROUTES
// =====================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/clients",
  clientRoutes
);

app.use(
  "/api/invoices",
  invoiceRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

// =====================================
// 404 HANDLER
// =====================================

app.use(
  "*",
  (req, res) => {

    res.status(404).json({

      error:
        "Route not found"

    });
  }
);

// =====================================
// GLOBAL ERROR HANDLER
// =====================================

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      "SERVER ERROR:",
      err
    );

    res.status(500).json({

      error:
        "Internal server error"

    });
  }
);

// =====================================
// PORT
// =====================================

const PORT =
  process.env.PORT || 5000;

// =====================================
// SERVER
// =====================================

app.listen(
  PORT,
  () => {

    console.log(

      `🚀 Server running on port ${PORT}`

    );
  }
);