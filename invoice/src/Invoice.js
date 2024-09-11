import { Container, Typography, Button } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { toWords } from 'number-to-words';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = () => {
    const location = useLocation();
    const { id } = location.state;
    const { invoices } = location.state
    console.log(id);
    console.log(invoices);
    const selectedInvoice = invoices.find((invoice) => invoice.invoiceNo === id);
    console.log(selectedInvoice.invoiceNo);
    let Total = 0;
    for (let index in selectedInvoice.items) {
        Total += Number(selectedInvoice.items[index].totalAmount);
        console.log(Total)
    }
    const TotalInWords = toWords(Total);
    const WordsInTotal = TotalInWords.replace(/,/g, '');
    console.log(TotalInWords);
    function capitalizeFirstLetterEveryWord(str) {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }
    const capitalizedSentence = capitalizeFirstLetterEveryWord(WordsInTotal);

    const downloadPDF = () => {
        const invoiceElement = document.getElementById('invoice');
        if (!invoiceElement) {
            console.error('Invoice element not found');
            return;
        }
        html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`invoice_${selectedInvoice.invoiceNo}.pdf`);
        }).catch(error => {
            console.error('Error generating PDF:', error);
        });
    };

    return (
        <Container sx={{ backgroundColor: 'white' }}>
            <Button variant="contained" onClick={downloadPDF} sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', ml: 'auto', mr: '30px' }}>
                Download as PDF
            </Button>
            <div id="invoice" style={{ padding: '30px' }}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <img src="/CLogo.jpg" alt="logo" height="100px" width="200px" />
                    </Grid>

                    <Grid size={6} sx={{ textAlign: 'right' }}>
                        <b>Tax Invoice/Bill of Supply/Cash Memo</b>
                        <Typography sx={{ textAlign: 'right' }}>Original for Receipt </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Sold By:</Typography>
                        <Typography sx={{ textAlign: 'left' }}>{selectedInvoice.sellerName}</Typography>
                        <Typography sx={{ textAlign: 'left' }}>{selectedInvoice.sellerAddress}</Typography>
                        <Typography sx={{ textAlign: 'left' }}>{selectedInvoice.sellerCity},{selectedInvoice.sellerState},{selectedInvoice.sellerPincode}</Typography>
                    </Grid>

                    <Grid size={6} sx={{ textAlign: 'right' }}>
                        <Typography sx={{ textAlign: 'right', fontWeight: 'bold' }}>Billing Address:</Typography>
                        <Typography sx={{ textAlign: 'right' }}>{selectedInvoice.billingName}</Typography>
                        <Typography sx={{ textAlign: 'right' }}>{selectedInvoice.billingAddress}</Typography>
                        <Typography sx={{ textAlign: 'right' }}>{selectedInvoice.billingCity},{selectedInvoice.billingState},{selectedInvoice.billingPincode}</Typography>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>State/UT Code:</Typography>
                            <Typography component="span">{selectedInvoice.billingStateCode}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={6}>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>PAN NO:</Typography>
                            <Typography component="span">{selectedInvoice.sellerPAN}</Typography>
                        </Box>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>GST Registration No:</Typography>
                            <Typography component="span">{selectedInvoice.sellerGST}</Typography>
                        </Box>

                    </Grid>

                    <Grid size={6} sx={{ textAlign: 'right' }}>
                        <Typography sx={{ textAlign: 'right', fontWeight: 'bold' }}>Shipping Address:</Typography>
                        <Typography sx={{ textAlign: 'right' }}>{selectedInvoice.shippingName}</Typography>
                        <Typography sx={{ textAlign: 'right' }}>{selectedInvoice.shippingAddress}</Typography>
                        <Typography sx={{ textAlign: 'right' }}>{selectedInvoice.shippingCity},{selectedInvoice.shippingState},{selectedInvoice.shippingPincode}</Typography>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>State/UT Code:</Typography>
                            <Typography component="span">{selectedInvoice.shippingStateCode}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={6}>

                    </Grid>

                    <Grid size={6} sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>Place Of Supply:</Typography>
                            <Typography component="span">{selectedInvoice.placeOfSupply}</Typography>
                        </Box>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}> Place Of Delivery:</Typography>
                            <Typography component="span">{selectedInvoice.placeOfDelivery}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={6}>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}> Order Number:</Typography>
                            <Typography component="span">{selectedInvoice.orderNo}</Typography>
                        </Box>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>Order Date: </Typography>
                            <Typography component="span">{selectedInvoice.orderDate}</Typography>
                        </Box>

                    </Grid>

                    <Grid size={6} sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>Invoice Number: </Typography>
                            <Typography component="span">{selectedInvoice.invoiceNo}</Typography>
                        </Box>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>Invoice Details : </Typography>
                            <Typography component="span">{selectedInvoice.invoiceDetails}</Typography>
                        </Box>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}> Invoice Date: </Typography>
                            <Typography component="span">{selectedInvoice.invoiceDate}</Typography>
                        </Box>
                        {/* <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>  Invoice Details : </Typography>
                            <Typography component="span">{selectedInvoice.invoiceDetails}</Typography>
                        </Box>
                        <Box >
                            <Typography component="span" sx={{ fontWeight: 'bold' }}> Invoice Date: </Typography>
                            <Typography component="span">{selectedInvoice.invoiceDate}</Typography>
                        </Box> */}
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'grey' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sl.No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Unit Price</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Discount</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Net Amount</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Tax Type</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Tax Amount</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedInvoice.items.map((item, index = 0) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >{index + 1}</TableCell>
                                    <TableCell >{item.description}</TableCell>
                                    <TableCell align="right">{item.unitPrice}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{item.discount}</TableCell>
                                    <TableCell align="right">{item.netAmount}</TableCell>
                                    <TableCell align="right">
                                        {(item.taxType === "CGST & SGST") ? (
                                            <>
                                                CGST <br />
                                                SGST
                                            </>
                                        ) : (
                                            <>IGST</>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {(item.taxType === "CGST & SGST") ? (
                                            <>
                                                {item.taxAmount} <br />
                                                {item.taxAmount}
                                            </>
                                        ) : (
                                            <>{item.taxAmount}</>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">{item.totalAmount}</TableCell>
                                </TableRow>

                            ))}
                            <TableRow>
                                <TableCell colSpan={8} align="left" sx={{ fontWeight: 'bold' }}>Total:</TableCell>
                                <TableCell align="right">{Total}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={12} align="left" sx={{ fontSize: '20px', border: '1px 0px solid black', fontWeight: 'bold' }}>Amount in Words<br />
                                    {capitalizedSentence}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={12} align="right" sx={{ fontSize: '20px', fontWeight: 'bold' }}>For {selectedInvoice.sellerName}:<br />
                                    <img src={selectedInvoice.signature} alt='signature' height='50px' width='100px' /><br />
                                    Authorized Signatory

                                </TableCell>

                            </TableRow>

                        </TableBody>
                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={8} align="left" sx={{ fontWeight: 'bold' }}>Total:</TableCell>
                                <TableCell align="right">{Total}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align="right">Amount in Words</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{capitalizedSentence}</TableCell>
                            </TableRow>
                        </TableFooter> */}
                    </Table>
                </TableContainer>
            </div>
        </Container>
    )
}

export default Invoice