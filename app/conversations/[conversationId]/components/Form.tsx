'use client';

import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "../../../hooks/useConversation";
import ImageIcon from '@mui/icons-material/Image';
import { Box, IconButton, Stack, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


export const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
            ...data,
            conversationId: conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result.info.secure_url,
            conversationId: conversationId
        })
    }

    return (
        <Box
            sx={{
                borderTop: 1,
                borderColor: 'rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                gap: 2
            }}
        >
            <Box>
                <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                >
                    <ImageIcon />
                </CldUploadButton>

            </Box>
            <Stack
                direction="row"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    flexGrow: 1,
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    {...register("message", {
                        required: true
                    })}
                    placeholder="Write a message"
                />
                <Box>
                    <IconButton
                        aria-label="send message"
                        type="submit"
                    >
                        <SendIcon
                            color="primary"
                        />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    )

}
