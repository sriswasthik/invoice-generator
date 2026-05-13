import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function AnalyticsChart({ invoices }) {

  const chartData = invoices.map((inv) => ({
    name: inv.invoiceNumber.slice(-4),
    amount: inv.totalAmount
  }));

  return (

    <div style={styles.card}>

      <div style={styles.header}>

        <div>

          <h3 style={styles.title}>
            Revenue Analytics
          </h3>

          <p style={styles.subtext}>
            Invoice revenue overview
          </p>

        </div>

      </div>

      <div style={styles.chartWrapper}>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

const styles = {

  card: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    marginBottom: "30px"
  },

  header: {
    marginBottom: "20px"
  },

  title: {
    fontSize: "20px",
    fontWeight: "700"
  },

  subtext: {
    color: "#64748b",
    marginTop: "4px"
  },

  chartWrapper: {
    width: "100%",
    height: "320px"
  }

};

export default AnalyticsChart;