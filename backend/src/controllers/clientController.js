const prisma = require("../utils/prisma");

async function createClient(req, res) {
  try {
    const { name, email, phone, address, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: "Name and userId are required" });
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        address,
        userId
      }
    });

    res.json(client);

  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Failed to create client" });
    res.status(500).json({
  error: "Failed to create client",
  details: error.message
});
  }
}

async function getClientsByUser(req, res) {
  try {
    const { userId } = req.params;

    const clients = await prisma.client.findMany({
      where: {
        userId: Number(userId)
      },
      orderBy: {
        id: "desc"
      }
    });

    res.json(clients);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch clients" });
//   }
} catch (error) {
  console.error(error);
  res.status(500).json({
    error: "Failed to create client",
    details: error.message
  });
}

}

async function downloadInvoicePDF(req, res) {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        client: true,
        items: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    generateInvoicePDF(invoice, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}

async function deleteClient(req, res) {
  try {
    const { id } = req.params;

    await prisma.client.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Client deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete client" });
  }
}

module.exports = {
  createClient,
  getClientsByUser,
  deleteClient
};