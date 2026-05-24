function StatCard({

  title,

  value,

  icon = "📈",

  trend = "+12%"

}) {

  return (

    <div
      style={styles.card}

      onMouseEnter={(e) => {

        e.currentTarget.style.transform =
          "translateY(-4px)";

        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,0.08)";
      }}

      onMouseLeave={(e) => {

        e.currentTarget.style.transform =
          "translateY(0px)";

        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(0,0,0,0.04)";
      }}
    >

      {/* TOP */}

      <div style={styles.top}>

        <div style={styles.iconBox}>
          {icon}
        </div>

        <div style={styles.trend}>
          {trend}
        </div>

      </div>

      {/* CONTENT */}

      <div>

        <p style={styles.title}>
          {title}
        </p>

        <h2 style={styles.value}>
          {value}
        </h2>

      </div>

    </div>
  );
}

const styles = {

  card: {

    background: "white",

    padding: "24px",

    borderRadius: "24px",

    border:
      "1px solid #e2e8f0",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.04)",

    transition:
      "all 0.25s ease",

    cursor: "pointer",

    display: "flex",

    flexDirection: "column",

    gap: "24px"
  },

  top: {

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center"
  },

  iconBox: {

    width: "52px",

    height: "52px",

    borderRadius: "16px",

    background:
      "#eef2ff",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "24px"
  },

  trend: {

    background:
      "#dcfce7",

    color: "#166534",

    padding: "8px 12px",

    borderRadius: "999px",

    fontSize: "13px",

    fontWeight: "700"
  },

  title: {

    color: "#64748b",

    fontSize: "14px",

    marginBottom: "10px",

    fontWeight: "500"
  },

  value: {

    fontSize: "34px",

    fontWeight: "800",

    lineHeight: 1.1
  }

};

export default StatCard;