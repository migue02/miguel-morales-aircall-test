import {
    Button,
    Divider,
    Flex,
    Form,
    FormItem,
    Spacer,
    TextFieldInput,
    Typography,
} from '@aircall/tractor';
import { FC, useState } from 'react';
import { Call } from '../../api/types';
import CallNotes from '../CallNotes';

interface IProps {
    call: Call;
    onAddNote: (content: string) => Promise<boolean>;
}

const CallBody: FC<IProps> = ({ call, onAddNote }) => {
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [content, setContent] = useState('');

    const onSubmit = () => {
        try {
            onAddNote(content);
        } finally {
            setContent('');
            setIsAddingNote(false);
        }
    };

    return (
        <Spacer space="s" direction="vertical" width="100%">
            <Flex>
                <Spacer space="xs" direction="vertical" width="100%">
                    {call.direction === 'outbound' && (
                        <Flex>
                            <Typography variant="body" flexGrow="1">
                                Call done from
                            </Typography>
                            <Typography variant="body2">{call.from}</Typography>
                        </Flex>
                    )}
                    <Flex>
                        <Typography variant="body" flexGrow="1">
                            Call done via
                        </Typography>
                        <Typography variant="body2">{call.via}</Typography>
                    </Flex>
                    {call.direction === 'inbound' && (
                        <Flex>
                            <Typography variant="body" flexGrow="1">
                                Call done to
                            </Typography>
                            <Typography variant="body2">{call.to}</Typography>
                        </Flex>
                    )}
                </Spacer>
            </Flex>
            <Button
                size="xSmall"
                variant={isAddingNote ? 'destructive' : 'primary'}
                onClick={() => setIsAddingNote(!isAddingNote)}
            >
                {!isAddingNote ? 'Add note' : 'Cancel addition'}
            </Button>
            {isAddingNote && (
                <Form onSubmit={onSubmit}>
                    <Flex>
                        <FormItem label="Content" name="Content">
                            <TextFieldInput
                                value={content}
                                size="small"
                                onChange={({ target }) =>
                                    setContent(target.value)
                                }
                            />
                        </FormItem>
                        <FormItem marginTop="auto" marginLeft="10px">
                            <Button type="submit" size="small">
                                Add
                            </Button>
                        </FormItem>
                    </Flex>
                </Form>
            )}
            {call.notes.length > 0 && (
                <Spacer space="s" width="100%" direction="vertical">
                    <Divider orientation="horizontal" />
                    <CallNotes notes={call.notes} />
                </Spacer>
            )}
        </Spacer>
    );
};

export default CallBody;
