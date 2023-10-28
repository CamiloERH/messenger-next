"use client";

import { User } from "@prisma/client";
import useRoutes from "../../hooks/useRoutes";
import { useState } from "react";
import { Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Box, IconButton } from '@mui/material';
import { DesktopItem } from "./DesktopItem";
import { UserAvatar } from "../Avatar";
import { UserSettingsModal } from "./UserSettingsModal";

interface DesktopSidebarProps {
    currentUser: User
}

const drawerWidth = 80;

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {

    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

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
                        xs: 'none',
                        md: 'flex'
                    },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        paddingY: 2
                    }}
                >
                    <List>
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
                    <Box
                        sx={{
                            display: ' flex',
                            justifyContent: 'center'
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
