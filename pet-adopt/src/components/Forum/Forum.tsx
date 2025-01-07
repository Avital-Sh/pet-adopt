import { Accordion, AccordionDetails, AccordionSummary, IconButton, TextField } from "@mui/material";
import { messageQuery } from "../../query/MessageQuery";
import { useState } from "react";
import * as S from './Forum.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';

interface MessageForm {
  message: string;
  author: string;
}

const Forum = () => {

  const { data: posts, refetch } = messageQuery.useGetMessages();
  const { mutate: postMessage } = messageQuery.usePostMessage();
  const [formState, setFormState] = useState<MessageForm>({
    author: '',
    message: ''
  });

  const isSendButtonDisabled = formState.author === '' || formState.message === ''

  return (
    <S.Container>

      <Accordion style={{ marginBottom: "50px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ color: "#1876D1" }} id="panel-header" aria-controls="panel-content">
          Tell us about your experience
        </AccordionSummary>
        <AccordionDetails>
          <S.PostMessageContainer>
            <TextField style={{ width: "15rem" }} helperText="Your name" value={formState.author} onChange={(e) => setFormState({ ...formState, author: e.target.value })}>Author</TextField>
            <TextField multiline rows={4} helperText="Message" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}>Message</TextField>
            <IconButton disabled={isSendButtonDisabled} style={{ width: "100px" }} onClick={() => postMessage(formState, {
              onSuccess() {
                setTimeout(() => { refetch() }, 100)
                setFormState({ author: '', message: '' })
              },
            })}>
              <SendIcon style={{ fontSize: "50px", color: isSendButtonDisabled ? '' : '#1876D1' }} />
            </IconButton>
          </S.PostMessageContainer>
        </AccordionDetails>
      </Accordion>






      {posts?.map(({ author, message, postedTime }) => {
        return <S.MessageContainer>
          <S.MessageContainerSubject>
            <S.AuthText>
              {author}
            </S.AuthText>
            <S.PostedTime>
              {postedTime}
            </S.PostedTime>
          </S.MessageContainerSubject>
          <S.MessageContainerText>
            <S.MessageText>
              {message}
            </S.MessageText>
          </S.MessageContainerText>
        </S.MessageContainer>
      })}
    </S.Container>
  )

}

export default Forum;