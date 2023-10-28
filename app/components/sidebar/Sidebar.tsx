import Box from '@mui/material/Box';
import { DesktopSidebar } from './DesktopSidebar';
import getCurrentUser from "../../actions/getCurrentUser";
import { MobileFooter } from './MobileFooter';

export default async function Sidebar({ children }: { children: React.ReactNode }) {

    const currentUser = await getCurrentUser();

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter currentUser={currentUser!} />
            {children}
        </Box>
    )
}