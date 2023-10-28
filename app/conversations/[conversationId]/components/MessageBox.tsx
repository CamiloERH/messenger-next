'use client';

import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "../../../types";

import { UserAvatar } from "../../../components/Avatar";
// import ImageModal from "./ImageModal";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { blue, grey } from '@mui/material/colors';
import Image from "next/image";
import { ImageModal } from "./ImageModal";

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {

    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const isOwn = session.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    padding: 4,
                    justifyContent: isOwn ? 'flex-end' : 'flex-start'
                }}
            >
                <Box sx={{ order: isOwn ? 2 : 'inherit' }}>
                    <UserAvatar
                        user={data.sender}
                    />
                </Box>
                <Stack
                    gap={2}
                    alignItems={isOwn ? 'flex-end' : 'flex-start'}
                >
                    <Typography variant="body1">
                        {`${data.sender.name} `}
                        <Typography variant="subtitle1" component="span" color="text.secondary">
                            {format(new Date(data.createdAt), 'p')}
                        </Typography>
                    </Typography>
                    {
                        data.image ?
                            <Image
                                alt="Image"
                                height="288"
                                width="288"
                                onClick={() => setImageModalOpen(true)}
                                src={data.image}
                            />
                            :
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: isOwn ? 'flex-end' : 'flex-start',
                                    maxWidth: {
                                        xs: '200px',
                                        md: '400px',
                                        lg: '500px'
                                    }
                                }}
                            >
                                <Chip
                                    sx={{
                                        height: 'auto',
                                        '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                            wordWrap: 'break-word',
                                            padding: 2,
                                        },
                                        bgcolor: isOwn ? blue[200] : grey[100]
                                    }}
                                    label={data.body}
                                />
                            </Box>
                    }

                    {isLast && isOwn && seenList.length > 0 && (
                        <Typography textAlign="end" variant="subtitle2" color="text.secondary">
                            {`Seen by ${seenList}`}
                        </Typography>
                    )}
                </Stack>
            </Box>
            <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
        </>
    )
}