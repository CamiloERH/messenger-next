import { Icon, ListItem, ListItemButton, ListItemIcon, Tooltip } from "@mui/material";
import Link from 'next/link';

interface DesktopItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

export const DesktopItem: React.FC<DesktopItemProps> = ({ label, href, icon: Icon, active, onClick }) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Tooltip key={label} title={label} placement="right" disableInteractive>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 64,
                        justifyContent: 'center',
                        px: 2.5,
                    }}
                    component={Link}
                    href={href}
                    onClick={handleClick}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            justifyContent: 'center'
                        }}
                    >
                        <Icon
                            sx={{
                                fontSize: '28px',
                                color: active ? 'primary.main' : 'inherit'
                            }}
                        />
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
        </Tooltip>
    )
}
