'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "../../../hooks/useOtherUser";
import useActiveList from "../../../hooks/useActiveList";

import { UserAvatar } from "../../../components/Avatar";
import { UserAvatarGroup } from "../../../components/AvatarGroup";
import { AppBar, Box, Toolbar, IconButton, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ProfileDrawer } from "./ProfileDrawer";
// import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

export const Header: React.FC<HeaderProps> = ({ conversation }) => {

    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return isActive ? 'Active' : 'Offline'
    }, [conversation, isActive]);


    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="go back"
                        component={Link}
                        href="/conversations"
                        sx={{
                            display: {
                                md: 'none'
                            }
                        }}
                    >
                        <ChevronLeftIcon
                            fontSize="large"
                        />
                    </IconButton>
                    {conversation.isGroup ? (
                        <UserAvatarGroup users={conversation.users} />
                    ) : (
                        <UserAvatar user={otherUser} />
                    )}
                    <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between">
                        <Stack sx={{ marginLeft: 2 }}>
                            <Typography variant="body2">
                                {conversation.name || otherUser.name}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {statusText}
                            </Typography>
                        </Stack>
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>

    )

}