"use client";

import { User } from "@prisma/client";
import { Box, List, Typography } from '@mui/material';
import { UserItem } from "./UserItem";

interface UserListProps {
    items: User[];
}

export const UserList: React.FC<UserListProps> = ({ items }) => {
    return (
        <Box
            sx={{
                overflowY: 'auto',
                borderRight: 1,
                borderColor: 'rgba(0, 0, 0, 0.12)',
                width: {
                    xs: '100%',
                    md: '360px'
                },
            }}
        >
            <Box
                sx={{
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h6" >
                    Usuarios
                </Typography>
            </Box>
            <List
                sx={{
                    bgcolor: 'background.paper'
                }}
            >
                {items.map((item) => (
                    <UserItem
                        key={item.id}
                        data={item}
                    />
                ))}
            </List>
        </Box>
    )
}