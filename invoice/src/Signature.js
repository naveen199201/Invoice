import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Signature = () => {
  const [selectedSignature, setSelectedSignature] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box mt={2}>
      {selectedSignature ? (
        <>
          <img src={selectedSignature} alt="Signature" style={{ maxWidth: '200px' }} />
          <Typography variant="body2">Authorised Signatory</Typography>
        </>
      ) : (
        <Typography variant="body2">No signature selected</Typography>
      )}
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Signature
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>
    </Box>
  );
};

export default Signature;
