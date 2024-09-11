import React, { useState } from 'react';
import {
    TextField, Button, Grid, Typography, Box, Divider, MenuItem, Select, InputLabel, FormControl, Container
} from '@mui/material';
import Signature from './Signature'; // Placeholder for signature component
import { useNavigate } from 'react-router-dom';

const InvoiceFormData = ({ onAddInvoice }) => {
    const [formData, setFormData] = useState({
        companyLogo: '',
        sellerName: '',
        sellerAddress: '',
        sellerCity: '',
        sellerState: '',
        sellerPincode: '',
        sellerPAN: '',
        sellerGST: '',
        placeOfSupply: '',
        billingName: '',
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingPincode: '',
        billingStateCode: '',
        shippingName: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingPincode: '',
        shippingStateCode: '',
        placeOfDelivery: '',
        orderNo: '',
        orderDate: '',
        invoiceNo: '',
        invoiceDetails: '',
        invoiceDate: '',
        reverseCharge: 'No',
        items: [{ description: '', unitPrice: '', quantity: '', discount: '', taxRate: 18 }],
        signature: ''
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prevState => ({ ...prevState, signature: base64String }));

            };
            reader.readAsDataURL(file);
        }
    };
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        // if (name === 'quantity' && value < 0) {
        //     return;
        // }
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...formData.items];
        items[index][name] = value;
        setFormData(prevState => ({ ...prevState, items }));
        console.log(formData)
    };

    const addItem = () => {
        setFormData(prevState => ({
            ...prevState,
            items: [...prevState.items, { description: '', unitPrice: '', quantity: '', discount: '', taxRate: 18 }]
        }));
    };

    const calculateAmounts = () => {
        return formData.items.map(item => {
            const unitPrice = parseFloat(item.unitPrice) || 0;
            const quantity = parseInt(item.quantity) || 0;
            const discount = parseFloat(item.discount) || 0;
            const netAmount = unitPrice * quantity - (unitPrice*discount*quantity)/100;
            const taxRate = parseFloat(item.taxRate) || 18;
            const taxType = formData.placeOfSupply === formData.placeOfDelivery ? 'CGST & SGST' : 'IGST';
            const taxAmount = taxType === 'CGST & SGST'
                ? (netAmount * taxRate / 100) / 2 // CGST
                : netAmount * taxRate / 100;

            const totalAmount = taxType === 'CGST & SGST'
                ? (netAmount + 2 * taxAmount) // CGST
                : taxType === 'CGST & SGST'
                    ? (netAmount + 2 * taxAmount)// CGST
                    : netAmount + taxAmount;

            return {
                ...item,
                netAmount,
                taxType,
                taxAmount,
                totalAmount
            };
        });
    };

    const amounts = calculateAmounts();
    const total = amounts.reduce((sum, item) => sum + item.totalAmount, 0);

    const amountInWords = (num) => {
        return num.toFixed(2);
    };

    const handleRemoveItem = (index) => {
        const items = formData.items.filter((_, i) => i !== index);
        setFormData(prevState => ({ ...prevState, items }));
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        const newInvoice = {
            ...formData,
            items: amounts // Include calculated amounts in the invoice
        };

        onAddInvoice(newInvoice);
        setFormData({
            companyLogo: '',
            sellerName: '',
            sellerAddress: '',
            sellerCity: '',
            sellerState: '',
            sellerPincode: '',
            sellerPAN: '',
            sellerGST: '',
            placeOfSupply: '',
            billingName: '',
            billingAddress: '',
            billingCity: '',
            billingState: '',
            billingPincode: '',
            billingStateCode: '',
            shippingName: '',
            shippingAddress: '',
            shippingCity: '',
            shippingState: '',
            shippingPincode: '',
            shippingStateCode: '',
            placeOfDelivery: '',
            orderNo: '',
            orderDate: '',
            invoiceNo: '',
            invoiceDetails: '',
            invoiceDate: '',
            reverseCharge: 'No',
            items: [{ description: '', unitPrice: '', quantity: '', discount: '', taxRate: 18 }],
            signature: ''
        });
        navigate('/')
        console.log(formData)
    };

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>Invoice Form</Typography>
            <Container>
                <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
                    <Grid item xs={12} sx={{ marginBlock: '10px' }}>
                        <Typography variant="h6"  sx={{fontWeight:'bold'}}>Seller Details</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ border: '1px solid #d3cccc', padding: '5px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="sellerName"
                                value={formData.sellerName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Address"
                                name="sellerAddress"
                                value={formData.sellerAddress}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="City"
                                name="sellerCity"
                                value={formData.sellerCity}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="State"
                                name="sellerState"
                                value={formData.sellerState}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Pincode"
                                name="sellerPincode"
                                value={formData.sellerPincode}
                                onChange={handleChange}
                                fullWidth
                                required
                                type="number"
                                inputProps={{ min: 0, maxLength: 6 }} // Optionally restrict length
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="PAN No."
                                name="sellerPAN"
                                value={formData.sellerPAN}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="GST Registration No."
                                name="sellerGST"
                                value={formData.sellerGST}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        {/* Place of Supply */}
                        <Grid item xs={12}>
                            <TextField
                                label="Place of Supply"
                                name="placeOfSupply"
                                value={formData.placeOfSupply}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>


                    {/* Billing Details */}

                    <Grid item xs={12} sx={{ marginBlock: '10px' }}>
                        <Typography variant="h6"  sx={{fontWeight:'bold'}}>Billing Details</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ border: '1px solid #d3cccc', padding: '5px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="billingName"
                                value={formData.billingName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Address"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="City"
                                name="billingCity"
                                value={formData.billingCity}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="State"
                                name="billingState"
                                value={formData.billingState}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Pincode"
                                name="billingPincode"
                                value={formData.billingPincode}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="State/UT Code"
                                name="billingStateCode"
                                value={formData.billingStateCode}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* Shipping Details */}
                    <Grid item xs={12} sx={{ marginBlock: '10px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Shipping Details</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ border: '1px solid #d3cccc', padding: '5px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="shippingName"
                                value={formData.shippingName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Address"
                                name="shippingAddress"
                                value={formData.shippingAddress}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="City"
                                name="shippingCity"
                                value={formData.shippingCity}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="State"
                                name="shippingState"
                                value={formData.shippingState}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Pincode"
                                name="shippingPincode"
                                value={formData.shippingPincode}
                                onChange={handleChange}
                                fullWidth
                                required
                                type='number'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="State/UT Code"
                                name="shippingStateCode"
                                value={formData.shippingStateCode}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>


                        {/* Place of Delivery */}
                        <Grid item xs={12}>
                            <TextField
                                label="Place of Delivery"
                                name="placeOfDelivery"
                                value={formData.placeOfDelivery}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* Order Details */}
                    <Grid item xs={12} sx={{ marginBlock: '10px' }}>
                        <Typography variant="h6"  sx={{fontWeight:'bold'}}>Order Details</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ border: '1px solid #d3cccc', padding: '5px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Order No."
                                name="orderNo"
                                value={formData.orderNo}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Order Date"
                                name="orderDate"
                                type="date"
                                value={formData.orderDate}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* Invoice Details */}
                    <Grid item xs={12} sx={{ marginBlock: '10px' }}>
                        <Typography variant="h6"  sx={{fontWeight:'bold'}}>Invoice Details</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ border: '1px solid #d3cccc', padding: '5px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Invoice No."
                                name="invoiceNo"
                                value={formData.invoiceNo}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Invoice Date"
                                name="invoiceDate"
                                type="date"
                                value={formData.invoiceDate}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Invoice Details"
                                name="invoiceDetails"
                                value={formData.invoiceDetails}
                                onChange={handleChange}
                                fullWidth
                                required
                                multiline
                            />
                        </Grid>


                        {/* Reverse Charge */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Reverse Charge</InputLabel>
                                <Select
                                    name="reverseCharge"
                                    value={formData.reverseCharge}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Item Details */}
                    <Grid item xs={12} sx={{ marginBlock: '10px' }}>
                        <Typography variant="h6"  sx={{fontWeight:'bold'}}>Item Details</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ border: '1px solid #d3cccc', padding: '5px' }}>
                        {formData.items.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Description"
                                        name="description"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        label="Unit Price"
                                        name="unitPrice"
                                        type="number"
                                        value={item.unitPrice}
                                        onChange={(e) => handleItemChange(index, e)}
                                        inputProps={{ min: 1 }}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        label="Discount"
                                        name="discount"
                                        type="number"
                                        value={item.discount}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        label="Tax Rate (%)"
                                        name="taxRate"
                                        type="number"
                                        value={item.taxRate}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item sm={1}>
                                    <Typography color="error" onClick={() => handleRemoveItem(index)} sx={{my:'15px'}}>
                                        Delete
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={addItem}>
                                Add Item
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Signature */}
                    <Grid item xs={12} sx={{display:'flex', justifyContent:'end'}}>
                        {/* <Typography variant="h6" sx={{fontWeight:'bold'}}>Signature:</Typography> */}
                        <Button variant="contained" component="label" sx={{ mt: 2 }} >
                            Upload Signature
                            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                        <Button variant="contained" color="primary" type="submit" sx={{ display: 'flex', justifySelf: 'flex-end', ml: 'auto', mr: 'auto' }}>
                            Submit Invoice
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default InvoiceFormData;
