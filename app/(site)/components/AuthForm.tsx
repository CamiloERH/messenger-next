"use client";

import { Button, Card, Chip, Container, Divider, Stack, TextField, Typography, Link } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react";



type Variant = 'LOGIN' | 'REGISTER';

export const AuthForm = () => {

  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          console.log(callback);
          if (callback?.error) {
            toast.error('Invalid credentials');
          }

          if (callback?.ok && !callback?.error) {
            toast.success('Logged in')
          }
        })
    }
  }


  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid Credentials')
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Logged in')
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginY: '3rem',
        backgroundColor: {
          xs: 'inherit',
          md: 'background.paper'
        },
        boxShadow: {
          xs: 0,
          md: 1
        },
        borderRadius: 1
      }}
    >
      <Stack
        component="form"
        sx={{ paddingX: '1rem', paddingY: '3rem', gap: 3 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          variant === 'REGISTER' &&
          <TextField
            label="Nombre"
            variant="standard"
            {...register("name", {
              required: 'Este campo es requerido',
            })}
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />
        }
        <TextField
          label="Correo"
          variant="standard"
          {...register("email", {
            required: 'Este campo es requerido',
          })}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />
        <TextField
          label="Contraseña"
          variant="standard"
          type="password"
          {...register("password", {
            required: 'Este campo es requerido',
          })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <Button
          type="submit"
          variant="contained"
        >
           {variant === 'LOGIN' ? 'Iniciar sesión' : 'Registrarse'}
        </Button>
        <Divider><Chip label="O inicia sesión con" /></Divider>
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={() => socialAction('github')}
          >
            GitHub
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => socialAction('google')}
          >
            Google
          </Button>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Typography paragraph sx={{ marginBottom: 0 }}>
            {variant === 'LOGIN' ? '¿Usuario nuevo?' : '¿Ya tienes una cuenta?'}
          </Typography>
          <Link onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Crear una cuenta' : 'Iniciar sesión'}
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}
