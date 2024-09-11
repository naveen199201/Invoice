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
    
    const selectedInvoice = invoices.find((invoice) => invoice.invoiceNo === id);
    
    let Total = 0;
    let TotalTax=0;
    for (let index in selectedInvoice.items) {
        TotalTax += Number(selectedInvoice.items[index].taxAmount);
        Total += Number(selectedInvoice.items[index].totalAmount);
    }
    const TotalInWords = toWords(Total);
    const WordsInTotal = TotalInWords.replace(/,/g, '');
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
    
        // Ensure the image is fully loaded before rendering the canvas
        const images = invoiceElement.getElementsByTagName('img');
        const imagePromises = Array.from(images).map((img) => {
            return new Promise((resolve, reject) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = reject;
                }
            });
        });
    
        Promise.all(imagePromises)
            .then(() => {
                html2canvas(invoiceElement, { scale: 2, useCORS: true })
                    .then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jsPDF('p', 'mm', 'a4');
                        const imgWidth = 210; // A4 width in mm
                        const imgHeight = (canvas.height * imgWidth) / canvas.width;
                        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                        pdf.save(`invoice_${selectedInvoice.invoiceNo}.pdf`);
                    })
                    .catch((error) => {
                        console.error('Error generating PDF:', error);
                    });
            })
            .catch((error) => {
                console.error('Error loading images:', error);
            });
    };
    

    return (
        <Container sx={{ backgroundColor: 'white' }}>
            
            <div id="invoice" style={{ padding: '30px' }}>
                <Grid container spacing={2}>
                    <Grid size={6} sx={{marginBlock:'3%'}}>
                        <img src="/CLogo.jpg" alt="logo" height="100px" width="200px" />
                    </Grid>
                    <Grid size={6} sx={{ textAlign: 'right', marginBlock:'4%'}}>
                        <Typography sx={{ textAlign: 'right',fontWeight:'bold', fontSize:'1.5vw' }}>Tax Invoice/Bill of Supply/Cash Memo</Typography>
                        <Typography sx={{ textAlign: 'right', fontSize:'1.5vw'  }}>(Original for Receipt) </Typography>
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
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'grey' ,border:'1px solid black'}}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sl.No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Unit Price</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Discount(%)</TableCell>
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
                                    sx={{ border:'1px  solid black'}}
                                >
                                    <TableCell sx={{ border:'1px  solid black'}} >{index + 1}</TableCell>
                                    <TableCell sx={{ border:'1px  solid black'}}>{item.description}</TableCell>
                                    <TableCell align="right" sx={{ border:'1px  solid black'}}>{item.unitPrice}</TableCell>
                                    <TableCell align="right" sx={{ border:'1px  solid black'}}>{item.quantity}</TableCell>
                                    <TableCell align="right" sx={{ border:'1px  solid black'}}>{item.discount}</TableCell>
                                    <TableCell align="right" sx={{ border:'1px  solid black'}}>{item.netAmount}</TableCell>
                                    <TableCell align="right" sx={{ border:'1px  solid black'}}>
                                        {(item.taxType === "CGST & SGST") ? (
                                            <>
                                                CGST <br />
                                                SGST
                                            </>
                                        ) : (
                                            <>IGST</>
                                        )}
                                    </TableCell>
                                    <TableCell align="right" sx={{ border:'1px  solid black'}}>
                                        {(item.taxType === "CGST & SGST") ? (
                                            <>
                                                {item.taxAmount} <br />
                                                {item.taxAmount}
                                            </>
                                        ) : (
                                            <>{item.taxAmount}</>
                                        )}
                                    </TableCell>
                                    <TableCell align="right" sx={{ border:'1px  solid black'}}  >{item.totalAmount}</TableCell>
                                </TableRow>

                            ))}
                            <TableRow sx={{ border:'1px solid black'}}>
                                <TableCell colSpan={7} align="left" sx={{ fontWeight: 'bold' ,padding:'0',fontSize:'400'}}>TOTAL:</TableCell>
                                <TableCell align="right"sx={{fontWeight: 'bold' ,fontSize:'400', border:'1px solid black'}}>{TotalTax}</TableCell>
                                <TableCell align="right"sx={{fontWeight: 'bold' ,fontSize:'400', border:'1px solid black'}}>{Total}</TableCell>
                            </TableRow>
                            <TableRow sx={{ border:'1px  solid black'}}>
                                <TableCell colSpan={12} align="left" sx={{ fontSize: '20px', border: '1px  solid black', fontWeight: '600',padding:'0px' }}>Amount in Words<br />
                                    {capitalizedSentence}</TableCell>
                            </TableRow>
                            <TableRow sx={{ border:'1px  solid black'}}>
                                <TableCell colSpan={12} align="right" sx={{ fontSize: '20px', fontWeight: 'bold' }}>For {selectedInvoice.sellerName}:<br />
                                    <img src={selectedInvoice.signature} alt='signature' height='50px' width='200px' style={{ border: '2px solid black', borderRadius: '4px' }}   /><br />
                                    Authorized Signatory
                                </TableCell>
                            </TableRow>
                        </TableBody>    
                    </Table>
                </TableContainer>
                <Typography sx={{fontWeight:'200'}}>Whether tax is payable under reverse charge - {selectedInvoice.reverseCharge} </Typography>
            </div>
            <Button variant="contained" onClick={downloadPDF} sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', ml: 'auto', mr: 'auto' }}>
                Download as PDF
            </Button>
        </Container>
    )
}

export default Invoice