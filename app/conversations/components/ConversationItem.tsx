'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import useOtherUser from "../../hooks/useOtherUser";
import { UserAvatarGroup } from "../../components/AvatarGroup";
import { FullConversationType } from "../../types";
import { ListItem, ListItemButton, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { UserAvatar } from "@component/app/components/Avatar";

interface ConversationItemProps {
    data: FullConversationType,
    selected?: boolean;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ data, selected }) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = session.data?.user?.email

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray
            .filter((user) => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage?.body
        }

        return 'Started a conversation';
    }, [lastMessage]);

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={handleClick}
                selected={selected}
            >
                <ListItemAvatar>
                    {data.isGroup ? (
                        <UserAvatarGroup users={data.users} />
                    ) : (
                        <UserAvatar user={otherUser} />
                    )}
                </ListItemAvatar>
                <ListItemText
                    primary={data.name || otherUser?.name}
                    secondaryTypographyProps={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                    secondary={
                        <>
                            {lastMessage?.createdAt &&
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {format(new Date(lastMessage.createdAt), 'p')}
                                    </Typography>
                                    {` ${lastMessageText}`}
                                </>
                            }
                        </>
                    }
                />
            </ListItemButton>
        </ListItem>
    )



}