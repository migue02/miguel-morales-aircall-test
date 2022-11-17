import { Box, Typography, Accordion, Spacer } from '@aircall/tractor';
import { FC } from 'react';
import { Note } from '../../api/types';

interface ICallNotes {
    notes: Note[];
}

const CallNotes: FC<ICallNotes> = ({ notes }) => {
    return (
        <Spacer space="s" direction="vertical" width="100%">
            <Typography variant="heading">Notes</Typography>
            <Box>
                <Accordion.Container defaultSelected={1}>
                    {notes.map((note) => {
                        return (
                            <Accordion.Item id={note.id}>
                                <Accordion.Header>
                                    <Box
                                        backgroundColor="#E8E8E6"
                                        p="s"
                                        width="100%"
                                        cursor="pointer"
                                    >
                                        <Typography variant="subheading">
                                            Note 1
                                        </Typography>
                                    </Box>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Box p="m">{note.content}</Box>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion.Container>
            </Box>
        </Spacer>
    );
};

export default CallNotes;
