'use client';

import { User } from "@prisma/client";
import { AvatarGroup, Avatar } from '@mui/material';

interface UserAvatarGroupProps {
    users?: User[];
};

export const UserAvatarGroup: React.FC<UserAvatarGroupProps> = ({ users = [] }) => {
    const slicedUsers = users.slice(0, 3);
    return (
        <AvatarGroup max={3} sx={{ marginRight: 2 }}>
            {
                slicedUsers.map((user) =>
                    (<Avatar key={user.email} alt="Avatar" src={user?.image || '/images/placeholder.jpg'} />)
                )

            }
        </AvatarGroup>
    )
}