import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, TableHead, TableBody, TableCell, TableRow, Typography, TableContainer, Paper } from '@mui/material';

const Home = ({ invoices, setInvoices }) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create-invoice');
  };

  const handleGenerate = (id) => {
    navigate('/invoice', { state: { id, invoices } });
  };

  return (
    <Container sx={{ padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '8px',marginBlock:'30px' }}>
      {/* <Typography  sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
        <Typography variant="h3" sx={{textAlign:'center', fontWeight:700}}>Invoices</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ marginBlock: '20px', display:'flex', justifyContent:'flex-end',ml:'auto'}}
        >
           Create Invoice
        </Button>

      {/* </Typography> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow  sx={{
                backgroundColor: '#000', // Change color for even rows
                color: '#fff'
              }}>
              <TableCell sx={{ fontWeight: 'bold',textAlign:'center',fontSize:'20px', color: '#fff'}}>Invoice No</TableCell>
              <TableCell sx={{ fontWeight: 'bold',textAlign:'center',fontSize:'20px', color: '#fff'}}>Invoice Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign:'center',fontSize:'20px', color: '#fff'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white', // Change color for even rows
              }}
              >
                <TableCell sx={{  textAlign:'center' }}>{invoice.invoiceNo}</TableCell>
                <TableCell sx={{  textAlign:'center' }}>{invoice.invoiceDate}</TableCell>
                <TableCell sx={{  textAlign:'center', fontWeight:700}}>
                  <Button
                  sx={{fontWeight:500}}
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleGenerate(invoice.invoiceNo)}
                  >
                    Generate Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
