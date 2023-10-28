import { Box, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { AuthForm } from "./components/AuthForm";

export default function Home() {
    return (
        <Stack
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f3f4f6',
                height: '100%'
            }}
        >
            <Image
                alt="Logo"
                height={48}
                width={48}
                className="mx-auto w-auto"
                src="/images/logo.png"
            />
            <Typography sx={{ marginTop: 3, fontWeight: 'bold' }} variant="h4" component="h2" textAlign="center">
                Inicia sesión con tu cuenta.
            </Typography>
            <AuthForm />
        </Stack>
    )
}
