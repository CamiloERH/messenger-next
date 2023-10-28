import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { ListItem, Box, LinearProgress, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { UserAvatar } from "@component/app/components/Avatar";


interface UserItemProps {
    data: User
}

export const UserItem: React.FC<UserItemProps> = ({ data }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', { userId: data.id })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`);
            })
            .finally(() => setIsLoading(false));
    }, [data, router]);

    return (
        <>
            {isLoading && <LinearProgress />}
            <ListItem
                disablePadding
            >
                <ListItemButton
                    onClick={handleClick}
                >
                    <ListItemAvatar>
                        <UserAvatar user={data} />
                    </ListItemAvatar>
                    <ListItemText primary={data.name} />
                </ListItemButton>
            </ListItem>
        </>
    )
}