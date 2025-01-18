import { Accordion, AccordionDetails, AccordionSummary, IconButton, TextField, Typography } from "@mui/material";
import { messageQuery } from "../../query/MessageQuery";
import { useState } from "react";
import * as S from './Forum.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';

const Forum = () => {
  const { data: posts, refetch } = messageQuery.useGetMessages();
  const { mutate: postMessage } = messageQuery.usePostMessage();
  const [formState, setFormState] = useState({
    author: '',
    message: ''
  });

  const isSendButtonDisabled = formState.author === '' || formState.message === '';

  return (
    <S.ScrollableContainer>
      <S.ContentContainer>
        <Accordion style={{ marginBottom: "50px", width: "70%", maxWidth: "1200px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ color: "#1876D1" }} id="panel-header" aria-controls="panel-content">
            <Typography variant="h6">Tell us about your experience</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <S.PostMessageContainer>
              <TextField
                style={{ width: "15rem" }}
                helperText="Your name"
                value={formState.author}
                onChange={(e) => setFormState({ ...formState, author: e.target.value })}
              />
              <TextField
                multiline
                rows={4}
                helperText="Message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
              <IconButton
                disabled={isSendButtonDisabled}
                style={{ width: "100px" }}
                onClick={() => postMessage(formState, {
                  onSuccess() {
                    setTimeout(() => { refetch(); }, 100);
                    setFormState({ author: '', message: '' });
                  },
                })}
              >
                <SendIcon style={{ fontSize: "50px", color: isSendButtonDisabled ? '' : '#1876D1' }} />
              </IconButton>
            </S.PostMessageContainer>
          </AccordionDetails>
        </Accordion>
        {posts?.map(({ author, message, postedTime }) => (
          <S.MessageContainer key={postedTime}>
            <S.MessageContainerSubject>
              <S.AuthText>{author}</S.AuthText>
              <S.PostedTime>{postedTime}</S.PostedTime>
            </S.MessageContainerSubject>
            <S.MessageContainerText>
              <S.MessageText>{message}</S.MessageText>
            </S.MessageContainerText>
          </S.MessageContainer>
        ))}
      </S.ContentContainer>
    </S.ScrollableContainer>
  );
};

export default Forum;
