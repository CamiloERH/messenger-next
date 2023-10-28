'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { Modal, Container, Grid, Typography, TextField, Select, MenuItem, OutlinedInput, ListItemText, Checkbox, InputLabel, FormControl, Button, Divider, Stack } from '@mui/material';

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[];
}

export const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, onClose, users = [] }) => {

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
            name: '',
            members: []
        }
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        console.log(data);

        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        }).then(() => {
            router.refresh();
            onClose();
        }).catch(() => toast.error('Something went wrong!')).finally(() => setIsLoading(false));
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
                <Grid
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    container
                    padding={4}
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography variant="h6">Crea un nuevo grupo</Typography>
                        <Typography variant="subtitle1" color="text.secondary">Crea un chat con más de dos personas</Typography>
                    </Grid>
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
                        <FormControl fullWidth>
                            <InputLabel id="select-group-chat">Personas</InputLabel>
                            <Select
                                fullWidth
                                labelId="select-group-chat"
                                multiple
                                value={members}
                                onChange={(e) => setValue('members', e.target.value, {
                                    shouldValidate: true
                                })}
                                renderValue={(selected) => users.filter(user => selected.includes(user.id)).map(user => (user.name)).join(', ')}
                                input={<OutlinedInput label="Personas" />}
                            >
                                {users.map((user) => (
                                    <MenuItem
                                        key={user.id}
                                        value={user.id}
                                    >
                                        <Checkbox checked={members.indexOf(user.id) > -1} />
                                        <ListItemText primary={user.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                                Crear
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Modal>
    )
}