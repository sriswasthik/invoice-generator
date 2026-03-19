import { useEffect, useState } from "react";
import api from "../api/api";

function CreateInvoice() {

    const [clients, setClients] = useState([]);
    const [clientId, setClientId] = useState("");
    const [loading, setLoading] = useState(false);

    const [items, setItems] = useState([
        { description: "", quantity: 1, price: 0, taxPercent: 18 }
    ]);

    const userId = 1;

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const res = await api.get(`/clients/${userId}`);
        setClients(res.data);
    };

    const addItem = () => {
        setItems([
            ...items,
            { description: "", quantity: 1, price: 0, taxPercent: 18 }
        ]);
    };

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const createInvoice = async (e) => {
        e.preventDefault();

        const invoiceNumber = "INV-" + Date.now();

        await api.post("/invoices", {
            userId,
            clientId: Number(clientId),
            invoiceNumber,
            issueDate: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            items
        });

        alert("Invoice Created");
    };


    const calculateTotals = () => {

        let subtotal = 0;
        let tax = 0;

        items.forEach(item => {

            const qty = Number(item.quantity);
            const price = Number(item.price);
            const taxPercent = Number(item.taxPercent);

            const itemTotal = qty * price;
            const itemTax = itemTotal * (taxPercent / 100);

            subtotal += itemTotal;
            tax += itemTax;

        });

        return {
            subtotal,
            tax,
            total: subtotal + tax
        };
    };

    const CreateInvoice = async (e) => {
        e.preventDefault();

        setLoading(true);

        await api.post("/invoices", {...CreateingInvoice})

        setLoading(false);
        alert("Invoice Created")
    }

    const totals = calculateTotals();

    return (
        <div>

            <h2>Create Invoice</h2>

            <form onSubmit={createInvoice}>

                <label>Select Client</label>
                <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>

                    <option value="">Choose Client</option>

                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}

                </select>

                <h3>Invoice Items</h3>

                {items.map((item, index) => (

                    <div key={index} style={styles.itemRow}>

                        <input
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => updateItem(index, "description", e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => updateItem(index, "price", e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Tax %"
                            value={item.taxPercent}
                            onChange={(e) => updateItem(index, "taxPercent", e.target.value)}
                        />
                        <h3>Invoice Summary</h3>

                        <div style={styles.summary}>

                            <p>Subtotal: ₹{totals.subtotal}</p>
                            <p>Tax: ₹{totals.tax}</p>

                            <h3>Total: ₹{totals.total}</h3>

                        </div>
                    </div>

                ))}

                <button type="button" onClick={addItem}>
                    Add Item
                </button>

                <br /><br />

                <button type="submit">
  {loading ? "Creating..." : "Create Invoice"}
</button>
                

            </form>

        </div>
    );
}

const styles = {
    itemRow: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "10px",
        marginBottom: "10px"
    },
    summary: {
        marginTop: "20px",
        padding: "15px",
        background: "white",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        maxWidth: "300px"
    },
    
    option: {
        padding: "0"
    }
};

export default CreateInvoice;