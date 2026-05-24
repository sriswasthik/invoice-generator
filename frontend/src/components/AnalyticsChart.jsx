import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid

} from "recharts";

function AnalyticsChart({
  invoices
}) {

  const chartData =
    invoices.map((inv) => ({

      name:
        inv.invoiceNumber?.slice(-4),

      amount:
        inv.totalAmount || 0

    }));

  const totalRevenue =
    invoices.reduce(
      (sum, inv) =>
        sum +
        (inv.totalAmount || 0),
      0
    );

  const paidCount =
    invoices.filter(
      (inv) =>
        inv.status === "paid"
    ).length;

  const pendingCount =
    invoices.filter(
      (inv) =>
        inv.status !== "paid"
    ).length;

  const CustomTooltip = ({
    active,
    payload
  }) => {

    if (
      active &&
      payload &&
      payload.length
    ) {

      return (

        <div style={styles.tooltip}>

          <p style={styles.tooltipLabel}>
            Invoice {
              payload[0].payload.name
            }
          </p>

          <h4 style={styles.tooltipValue}>
            ₹{
              payload[0].value
            }
          </h4>

        </div>

      );
    }

    return null;
  };

  return (

    <div style={styles.wrapper}>

      {/* TOP */}

      <div style={styles.top}>

        <div>

          <h2 style={styles.title}>
            Revenue Analytics
          </h2>

          <p style={styles.subtitle}>
            Track invoice performance
            and revenue growth
          </p>

        </div>

        <div style={styles.badge}>
          Live Analytics
        </div>

      </div>

      {/* INSIGHTS */}

      <div style={styles.statsRow}>

        <div style={styles.statCard}>

          <p style={styles.statLabel}>
            Total Revenue
          </p>

          <h3 style={styles.statValue}>
            ₹{totalRevenue}
          </h3>

        </div>

        <div style={styles.statCard}>

          <p style={styles.statLabel}>
            Paid Invoices
          </p>

          <h3 style={styles.statValue}>
            {paidCount}
          </h3>

        </div>

        <div style={styles.statCard}>

          <p style={styles.statLabel}>
            Pending
          </p>

          <h3 style={styles.statValue}>
            {pendingCount}
          </h3>

        </div>

      </div>

      {/* CHART */}

      <div style={styles.chartArea}>

        <ResponsiveContainer
          width="100%"
          height={360}
        >

          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: "#64748b",
                fontSize: 12
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748b",
                fontSize: 12
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill:
                  "rgba(79,70,229,0.05)"
              }}
            />

            <Bar
              dataKey="amount"
              radius={[10, 10, 0, 0]}
              fill="#4f46e5"
              maxBarSize={48}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

const styles = {

  wrapper: {
    background: "white",

    borderRadius: "28px",

    padding: "30px",

    border:
      "1px solid #e2e8f0",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)"
  },

  top: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "28px"
  },

  title: {
    fontSize: "30px",

    fontWeight: "800",

    marginBottom: "8px"
  },

  subtitle: {
    color: "#64748b",

    lineHeight: 1.6
  },

  badge: {
    background: "#eef2ff",

    color: "#4338ca",

    padding: "10px 16px",

    borderRadius: "999px",

    fontWeight: "700",

    fontSize: "13px"
  },

  statsRow: {
    display: "grid",

    gridTemplateColumns:
      "repeat(3, 1fr)",

    gap: "18px",

    marginBottom: "32px"
  },

  statCard: {
    background: "#f8fafc",

    borderRadius: "20px",

    padding: "20px"
  },

  statLabel: {
    color: "#64748b",

    fontSize: "13px",

    marginBottom: "10px"
  },

  statValue: {
    fontSize: "28px",

    fontWeight: "800"
  },

  chartArea: {
    width: "100%",

    height: "360px"
  },

  tooltip: {
    background: "white",

    border:
      "1px solid #e2e8f0",

    borderRadius: "16px",

    padding: "14px 16px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)"
  },

  tooltipLabel: {
    color: "#64748b",

    marginBottom: "6px",

    fontSize: "13px"
  },

  tooltipValue: {
    fontSize: "22px",

    fontWeight: "800"
  }

};

export default AnalyticsChart;