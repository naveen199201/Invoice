import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceFormData from './InvoiceFormData';
// import InvoiceList from './InvoiceList'; // An example component for listing invoices
import Home from './Home'; // An example Home component
import Invoice from './Invoice';
import { useState } from 'react';

const App = () => {
  const [invoices, setInvoices] = useState([{
    "companyLogo": "https://static.vecteezy.com/system/resources/thumbnails/009/178/125/small/url-letter-logo-design-with-polygon-shape-url-polygon-and-cube-shape-logo-design-url-hexagon-logo-template-white-and-black-colors-url-monogram-business-and-real-estate-logo-vector.jpg",
    "sellerName": "ABC Pvt Ltd",
    "sellerAddress": "123 Business St",
    "sellerCity": "New York",
    "sellerState": "NY",
    "sellerPincode": "10001",
    "sellerPAN": "AAAPL1234C",
    "sellerGST": "12ABCDE1234F1Z5",
    "placeOfSupply": "New York",
    "billingName": "John Doe",
    "billingAddress": "456 Elm St",
    "billingCity": "Los Angeles",
    "billingState": "CA",
    "billingPincode": "90001",
    "billingStateCode": "06",
    "shippingName": "John Doe",
    "shippingAddress": "456 Elm St",
    "shippingCity": "Los Angeles",
    "shippingState": "CA",
    "shippingPincode": "90001",
    "shippingStateCode": "06",
    "placeOfDelivery": "New York",
    "orderNo": "ORD12345",
    "orderDate": "2024-09-10",
    "invoiceNo": "INV12345",
    "invoiceDetails": "Order for office supplies",
    "invoiceDate": "2024-09-12",
    "reverseCharge": "No",
    "items": [
      {
        "description": "Laptop",
        "unitPrice": "1000",
        "quantity": "2",
        "discount": "50",
        "taxRate": "18",
        "netAmount": "1950",
        "taxType": "CGST & SGST",
        "taxAmount": "351",
        "totalAmount": "2301"
      },
      {
        "description": "Keyboard",
        "unitPrice": "100",
        "quantity": "3",
        "discount": "0",
        "taxRate": "18",
        "netAmount": "300",
        "taxType": "CGST & SGST",
        "taxAmount": "54",
        "totalAmount": "354"
      }
    ],
    "signature": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4F5IcHmOj6DdcE9SeVZYCoZtg83rhaYw0w&s"
  }
  ]);

  const handleAddInvoice = (newInvoice) => {
    setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home invoices={invoices} setInvoices={setInvoices}/>} />
          <Route path="/create-invoice" element={<InvoiceFormData onAddInvoice={handleAddInvoice}/>} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
    </Router>
  );
};

export default App;
