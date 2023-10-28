'use client';

import { Modal, Box } from '@mui/material';
import Image from 'next/image';

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {

    if (!src) {
        return null;
    }

    return (
        <Modal
            open={isOpen!}
            onClose={onClose}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                }}
            >
                <Image
                    src={src}
                    width={320}
                    height={320}
                    alt="image"
                />
            </Box>
        </Modal>

    )
}