"use client";

import { Box, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';

export const EmptyState = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingY: 10,
        paddingX: 4,
        bgcolor: grey[100]
      }}
    >
      <Typography variant="h3">
        Selecciona una conversación o inicia una nueva.
      </Typography>
    </Box>
  )
}
