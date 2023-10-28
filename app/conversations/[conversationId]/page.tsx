import getConversationById from "../../actions/getConversationById";
import getMessages from "../../actions/getMessages";

// import Header from "./components/Header";
// import Body from "./components/Body";
// import Form from "./components/Form";
import { EmptyState } from "../../components/EmptyState";

import { Box } from '@mui/material';
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Body } from "./components/Body";

interface IParams {
    conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {

    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <Box component="main"
                sx={{
                    display: {
                        xs: 'none',
                    }
                }}
            >
                <EmptyState />
            </Box>
        )
    }

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <Header
                conversation={conversation}
            />
            <Body initialMessages={messages}/>
            <Form />
        </Box>
    )
}

export default ChatId;