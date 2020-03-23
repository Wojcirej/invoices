const invoicePayload = {
  invoice: {
    invoiceNumber: "FV 1/03/2020",
    issuedAt: new Date().getTime(),
    saleDate: new Date().getTime(),
    status: undefined,
    seller: {
      name: "Selling Company",
      address: "Wonderland",
      taxPayerNumber: "123-45-67-819",
      telephone: "123 456 789",
      email: "email@example.com",
      website: "http://www.example.com"
    },
    buyer: {
      name: "Buying Company",
      address: "Noland",
      taxPayerNumber: "012-34-56-789",
      telephone: "012 345 678",
      email: "email@example.com",
      website: "http://www.example.com"
    },
    order: {
      orderRows: [
        {
          product: {
            position: 1,
            name: "Pen",
            netPrice: 1.99,
            valueAddedTax: 0.23
          },
          quantity: 5
        },
        {
          product: {
            position: 2,
            name: "Pencil",
            netPrice: 0.8,
            valueAddedTax: 0.23
          },
          quantity: 10
        }
      ]
    }
  }
};

const orderPayload = invoicePayload.invoice.order;
const productPayload = invoicePayload.invoice.order.orderRows[0].product;

export { invoicePayload, orderPayload, productPayload };
