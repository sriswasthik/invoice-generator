function StatCard({ title, value }) {

    return (
        <div style={styles.card}>
            <p style={styles.title}>{title}</p>
            {/* onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"} */}
            {/* onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"} */}
            <h2>{value}</h2>
        </div>
    );
}



const styles = {
    card: {
        background: "white",
        padding: "18px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0"
    },

    title: {
        color: "#64748b",
        fontSize: "14px",
        marginBottom: "6px"
    }
};

export default StatCard;