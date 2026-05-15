const prisma = require("../utils/prisma");

// ==========================
// CREATE CLIENT
// ==========================

async function createClient(req, res) {

  try {

    const {
      name,
      email,
      phone,
      address
    } = req.body;

    // validation
    if (!name) {

      return res.status(400).json({
        error: "Client name is required"
      });
    }

    const client =
      await prisma.client.create({

        data: {
          name,
          email,
          phone,
          address,
          userId: req.userId
        }

      });

    res.json(client);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create client",
      details: error.message
    });
  }
}

// ==========================
// GET CLIENTS
// ==========================

async function getClientsByUser(
  req,
  res
) {

  try {

    const clients =
      await prisma.client.findMany({

        where: {
          userId: req.userId
        },

        orderBy: {
          id: "desc"
        }

      });

    res.json(clients);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch clients",
      details: error.message
    });
  }
}

// ==========================
// DELETE CLIENT
// ==========================

async function deleteClient(req, res) {

  try {

    const { id } = req.params;

    await prisma.client.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Client deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to delete client"
    });
  }
}

module.exports = {
  createClient,
  getClientsByUser,
  deleteClient
};