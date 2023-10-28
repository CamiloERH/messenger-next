import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import useConversation from './useConversation';

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const routes = [
        {
            label: 'Chat',
            href: '/conversations',
            icon: ChatIcon,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: GroupIcon,
            active: pathname === '/users'
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: LogoutIcon
        }
    ];

    return routes;
}

export default useRoutes;
