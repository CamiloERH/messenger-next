"use client";

import { User } from "@prisma/client";
import { styled } from '@mui/material/styles';
import { Badge, Avatar } from '@mui/material';

import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User;
};


export const UserAvatar: React.FC<AvatarProps> = ({ user }) => {

    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    return (
        <>
            {
                isActive
                    ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Avatar" src={user?.image || '/images/placeholder.jpg'} />
                        </StyledBadge >
                    )
                    : (<Avatar alt="Avatar" src={user?.image || '/images/placeholder.jpg'} />)
            }
        </>
    )
}


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));