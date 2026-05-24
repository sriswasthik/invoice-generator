const prisma =
  require("../utils/prisma");

// =====================================
// CREATE CLIENT
// =====================================

async function createClient(
  req,
  res
) {

  try {

    let {
      name,
      email,
      phone,
      address
    } = req.body;

    // =====================
    // VALIDATION
    // =====================

    if (!name) {

      return res.status(400).json({

        error:
          "Client name is required"

      });
    }

    // =====================
    // SANITIZE INPUTS
    // =====================

    name =
      name.trim();

    email =
      email
        ?.trim()
        ?.toLowerCase() || "";

    phone =
      phone?.trim() || "";

    address =
      address?.trim() || "";

    // =====================
    // CHECK DUPLICATE
    // =====================

    const existingClient =
      await prisma.client.findFirst({

        where: {

          userId:
            req.userId,

          name
        }

      });

    if (existingClient) {

      return res.status(409).json({

        error:
          "Client already exists"

      });
    }

    // =====================
    // CREATE CLIENT
    // =====================

    const client =
      await prisma.client.create({

        data: {

          name,

          email,

          phone,

          address,

          userId:
            req.userId
        }

      });

    // =====================
    // RESPONSE
    // =====================

    res.status(201).json({

      message:
        "Client created successfully",

      client

    });

  } catch (error) {

    console.error(
      "CREATE CLIENT ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to create client"

    });
  }
}

// =====================================
// GET CLIENTS
// =====================================

async function getClientsByUser(
  req,
  res
) {

  try {

    const clients =
      await prisma.client.findMany({

        where: {
          userId:
            req.userId
        },

        orderBy: {
          createdAt:
            "desc"
        }

      });

    res.status(200).json(
      clients
    );

  } catch (error) {

    console.error(
      "GET CLIENTS ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to fetch clients"

    });
  }
}

// =====================================
// DELETE CLIENT
// =====================================

async function deleteClient(
  req,
  res
) {

  try {

    const id =
      Number(req.params.id);

    // =====================
    // FIND CLIENT
    // =====================

    const client =
      await prisma.client.findFirst({

        where: {

          id,

          userId:
            req.userId
        }

      });

    // =====================
    // NOT FOUND
    // =====================

    if (!client) {

      return res.status(404).json({

        error:
          "Client not found"

      });
    }

    // =====================
    // DELETE
    // =====================

    await prisma.client.delete({

      where: { id }

    });

    // =====================
    // RESPONSE
    // =====================

    res.status(200).json({

      message:
        "Client deleted successfully"

    });

  } catch (error) {

    console.error(
      "DELETE CLIENT ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to delete client"

    });
  }
}

module.exports = {

  createClient,

  getClientsByUser,

  deleteClient
};