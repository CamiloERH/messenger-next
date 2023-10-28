'use client';

import { Fragment, useMemo, useState } from 'react'
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';

import useOtherUser from '../../../hooks/useOtherUser';
import useActiveList from '../../../hooks/useActiveList';

import { UserAvatar } from '../../../components/Avatar';
import { UserAvatarGroup } from '../../../components/AvatarGroup';
import { Drawer, Box, Stack, Typography, IconButton, Tooltip, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ConfirmModal } from './ConfirmModal';

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[]
    }
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, data, }) => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const otherUser = useOtherUser(data);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }

        return isActive ? 'Active' : 'Offline'
    }, [data, isActive]);



    return (
        <>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            />
            <Drawer
                anchor={"right"}
                open={isOpen}
                onClose={onClose}
            >
                <Box
                    sx={{
                        width: {
                            xs: '300px',
                            md: '400px',
                        },
                        padding: 2
                    }}
                >
                    <Stack
                        alignItems="center"
                        spacing={1}
                    >
                        {data.isGroup ? <UserAvatarGroup users={data.users} /> : <UserAvatar user={otherUser} />}
                        <Box textAlign="center">
                            <Typography variant="h6">{title}</Typography>
                            <Typography variant="body1" color="text.secondary">{statusText}</Typography>
                        </Box>
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => setConfirmOpen(true)}
                            >
                                <DeleteIcon fontSize='medium' color="error" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Divider sx={{ marginY: 2 }}></Divider>
                    {!data.isGroup &&
                        <List sx={{ width: '100%' }}>
                            <ListItem>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email"
                                    secondary={otherUser.email}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CalendarMonthIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Ingresó en"
                                    secondary={joinedDate}
                                />
                            </ListItem>
                        </List>
                    }
                </Box>
            </Drawer>
        </>
    )
}