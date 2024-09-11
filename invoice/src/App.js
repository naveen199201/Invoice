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
        "discount": "10",
        "taxRate": "18",
        "netAmount": "1800",
        "taxType": "IGST",
        "taxAmount": "324",
        "totalAmount": "2124"
      },
      {
        "description": "Keyboard",
        "unitPrice": "100",
        "quantity": "3",
        "discount": "0",
        "taxRate": "18",
        "netAmount": "300",
        "taxType": "IGST",
        "taxAmount": "54",
        "totalAmount": "354"
      }
    ],
    "signature": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4F5IcHmOj6DdcE9SeVZYCoZtg83rhaYw0w&s"
  },
    {
      "companyLogo": "https://static.vecteezy.com/system/resources/thumbnails/009/178/125/small/url-letter-logo-design-with-polygon-shape-url-polygon-and-cube-shape-logo-design-url-hexagon-logo-template-white-and-black-colors-url-monogram-business-and-real-estate-logo-vector.jpg",
      "sellerName": "XYZ Corp",
      "sellerAddress": "789 Commerce Ave",
      "sellerCity": "San Francisco",
      "sellerState": "CA",
      "sellerPincode": "94105",
      "sellerPAN": "XYZP1234D",
      "sellerGST": "22XYZP1234D1Z9",
      "placeOfSupply": "California",
      "billingName": "Alice Smith",
      "billingAddress": "101 Maple St",
      "billingCity": "San Francisco",
      "billingState": "CA",
      "billingPincode": "94107",
      "billingStateCode": "06",
      "shippingName": "Alice Smith",
      "shippingAddress": "101 Maple St",
      "shippingCity": "San Francisco",
      "shippingState": "CA",
      "shippingPincode": "94107",
      "shippingStateCode": "06",
      "placeOfDelivery": "California",
      "orderNo": "ORD67890",
      "orderDate": "2024-09-11",
      "invoiceNo": "INV67890",
      "invoiceDetails": "Purchase of electronic components",
      "invoiceDate": "2024-09-13",
      "reverseCharge": "No",
      "items": [
        {
          "description": "Monitor",
          "unitPrice": "300",
          "quantity": "1",
          "discount": "5",
          "taxRate": "18",
          "netAmount": "285",
          "taxType": "CGST",
          "taxAmount": "51.3",
          "totalAmount": "336.3"
        },
        {
          "description": "Mouse",
          "unitPrice": "25",
          "quantity": "4",
          "discount": "0",
          "taxRate": "18",
          "netAmount": "100",
          "taxType": "CGST",
          "taxAmount": "18",
          "totalAmount": "118"
        }
      ],
      "signature": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4F5IcHmOj6DdcE9SeVZYCoZtg83rhaYw0w&s"
    },
    {
      "companyLogo": "https://static.vecteezy.com/system/resources/thumbnails/009/178/125/small/url-letter-logo-design-with-polygon-shape-url-polygon-and-cube-shape-logo-design-url-hexagon-logo-template-white-and-black-colors-url-monogram-business-and-real-estate-logo-vector.jpg",
      "sellerName": "Tech Solutions",
      "sellerAddress": "456 Tech Park",
      "sellerCity": "Seattle",
      "sellerState": "WA",
      "sellerPincode": "98109",
      "sellerPAN": "TECH4567E",
      "sellerGST": "29TECH4567E1Z1",
      "placeOfSupply": "Washington",
      "billingName": "Bob Johnson",
      "billingAddress": "202 Pine St",
      "billingCity": "Seattle",
      "billingState": "WA",
      "billingPincode": "98101",
      "billingStateCode": "53",
      "shippingName": "Bob Johnson",
      "shippingAddress": "202 Pine St",
      "shippingCity": "Seattle",
      "shippingState": "WA",
      "shippingPincode": "98101",
      "shippingStateCode": "53",
      "placeOfDelivery": "Washington",
      "orderNo": "ORD98765",
      "orderDate": "2024-09-12",
      "invoiceNo": "INV98765",
      "invoiceDetails": "Subscription for software services",
      "invoiceDate": "2024-09-14",
      "reverseCharge": "No",
      "items": [
        {
          "description": "Software License",
          "unitPrice": "1500",
          "quantity": "1",
          "discount": "0",
          "taxRate": "18",
          "netAmount": "1500",
          "taxType": "SGST",
          "taxAmount": "270",
          "totalAmount": "1770"
        },
        {
          "description": "Support Service",
          "unitPrice": "200",
          "quantity": "2",
          "discount": "10",
          "taxRate": "18",
          "netAmount": "360",
          "taxType": "SGST",
          "taxAmount": "64.8",
          "totalAmount": "424.8"
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
