'use client';

import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useConversation from '../../../hooks/useConversation';
import { toast } from 'react-hot-toast';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {

    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push('/conversations');
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
    }, [router, conversationId, onClose]);

    return (
        <Dialog
            open={isOpen!}
            onClose={onClose}
        >
            <DialogTitle>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <WarningTwoToneIcon color="error"/>Borrar conversación
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estas seguro de borrar la conversación? Se borrará permanentemente.
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="text"
                    sx={{ color: "text.primary" }}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button
                    variant='contained'
                    color="error"
                    onClick={onDelete}
                    disabled={isLoading}
                >
                    Borrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
