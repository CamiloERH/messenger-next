"use client";

import { EmptyState } from "../components/EmptyState";
import { Box } from '@mui/material';

const ConversationsPage = () => {

    return (
        <Box
            sx={{
                display: {
                    xs: 'none',
                    md: 'flex'
                },
                width: '100%'
            }}
        >
            <EmptyState />
        </Box>
    )
}

export default ConversationsPage;
