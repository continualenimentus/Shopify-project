const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config({ path: '../.env' });

const app = express();
const port = 3001;

const shopifyGraphQLUrl = `https://${process.env.DOMAIN}/admin/api/2024-07/graphql.json`;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  
  
  }));

app.get('/users', async (req, res) => {
    const query = `
    {
      customers(first: 100) {
        edges {
          node {
            id
            firstName
            lastName
            email
            tags
          }
        }
      }
    }
  `;
    try {
        const response = await axios.post(
            shopifyGraphQLUrl,
            JSON.stringify({ query }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                },
            }
        );
        const customers = response.data.data.customers.edges.map((edge) => edge.node);
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/create-customer', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const mutation = `
    mutation {
      customerCreate(input: { firstName: "${firstName}", lastName: "${lastName}", email: "${email}", tags: ["42"] }) {
        customer {
          id
          firstName
          lastName
          email
          tags
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
    try {
        const response = await axios.post(
            shopifyGraphQLUrl,
            JSON.stringify({ query: mutation }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/update-customer', async (req, res) => {
    const { id, firstName, lastName, email } = req.body;
    const mutation = `
    mutation {
      customerUpdate(input: {id: "${id}", firstName: "${firstName}", lastName: "${lastName}", email: "${email}" }) {
        customer {
          id
          firstName
          lastName
          email
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
    try {
        const response = await axios.post(
            shopifyGraphQLUrl,
            JSON.stringify({ query: mutation }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/delete-customer', async (req, res) => {
    const { id } = req.body;
    const mutation = `
    mutation {
      customerDelete(input: {id: "${id}"}) {
        deletedCustomerId
        userErrors {
          field
          message
        }
      }
    }
  `;
    try {
        const response = await axios.post(
            shopifyGraphQLUrl,
            JSON.stringify({ query: mutation }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});