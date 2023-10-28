'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { CldUploadButton } from 'next-cloudinary';
import { Modal, Container, Grid, Typography, TextField, Button, Avatar, Stack, Divider } from '@mui/material';

import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface UserSettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/settings', data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal
            open={isOpen!}
            onClose={onClose}
            sx={{
                marginX: 2
            }}
        >
            <Container
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                }}
                maxWidth='sm'
            >
                <Stack
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    gap={5}
                    padding={4}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography variant="h6">Perfil</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Edita tu información</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Nombre"
                                variant="outlined"
                                {...register("name", {
                                    required: "Este campo es requerido"
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message as string}
                                placeholder="Escribe un nombre para el grupo"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography variant="h6">Foto</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}

                        >
                            <Stack direction="row" spacing={2}>
                                <Avatar alt="Current avatar image" src={image || currentUser?.image || '/images/placeholder.jpg'} />
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    onUpload={handleUpload}
                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                                >
                                    <Typography variant='h6'>Cambiar</Typography>
                                </CldUploadButton>
                            </Stack>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Divider></Divider>
                        </Grid>
                        <Grid
                            item
                            xs={12}

                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="flex-end"
                            >
                                <Button
                                    variant="text"
                                    disabled={isLoading}
                                    sx={{ color: "text.primary" }}
                                    onClick={onClose}
                                >

                                    Cancelar
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    Guardar
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Modal>
    )
}