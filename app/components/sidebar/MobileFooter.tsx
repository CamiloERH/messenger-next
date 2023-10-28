"use client";


import useRoutes from '@component/app/hooks/useRoutes';
import { Box, Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, IconButton } from '@mui/material';
import { DesktopItem } from './DesktopItem';
import { UserAvatar } from '../Avatar';
import { User } from '@prisma/client';
import { useState } from 'react';
import { UserSettingsModal } from './UserSettingsModal';
import useConversation from '../../hooks/useConversation';

const drawerWidth = '100%';

interface MobileFooterProps {
    currentUser: User
}

export const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {

    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);
    const { isOpen: isConversationOpen} = useConversation();

    if (isConversationOpen) {
        return null;
    }

    return (
        <>
            <UserSettingsModal
                currentUser={currentUser}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <Drawer
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                    },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="bottom"
            >
                <Box
                    sx={{
                        display: 'flex'
                    }}
                >
                    <List sx={{ display: 'flex', flexGrow: 0.9 }} disablePadding>
                        {routes.map((item) => (
                            <DesktopItem
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onClick}
                            />
                        ))}

                    </List>
                    <Divider orientation="vertical" flexItem />
                    <Box
                        sx={{
                            display: ' flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingX: 1,
                            flexGrow: 0.1
                        }}
                    >
                        <IconButton
                            onClick={() => setIsOpen(true)}
                        >
                            <UserAvatar user={currentUser} />
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}
