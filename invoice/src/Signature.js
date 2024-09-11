import React from 'react';
import { Box,Typography } from '@mui/material';

const Signature = ({ src }) => (
  <Box mt={2}>
    <img src={src} alt="Signature" style={{ maxWidth: '200px' }} />
    <Typography variant="body2">Authorised Signatory</Typography>
  </Box>
);

export default Signature;
