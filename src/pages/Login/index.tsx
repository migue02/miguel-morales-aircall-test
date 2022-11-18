import {
    Box,
    Button,
    Form,
    FormItem,
    FormItemStatuses,
    Grid,
    TextFieldInput,
} from '@aircall/tractor';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validationStatus, setValidationStatus] =
        useState<FormItemStatuses>('success');

    const { loading, login } = useUserContext();
    const navigate = useNavigate();

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            setValidationStatus('error');
        }
    };

    return (
        <Box
            width="400px"
            mx="auto"
            bg="primary.lighter"
            borderRadius={16}
            boxShadow={2}
            padding={32}
        >
            <Form onSubmit={onSubmit}>
                <Grid
                    gridColumnGap={4}
                    gridRowGap={5}
                    gridTemplateColumns="1fr"
                >
                    <FormItem label="Email" name="email">
                        <TextFieldInput
                            value={username}
                            onChange={({ target }) => setUserName(target.value)}
                        />
                    </FormItem>
                    <FormItem
                        label="Password"
                        name="email"
                        validationStatus={validationStatus}
                    >
                        <TextFieldInput
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            type="submit"
                            block
                            disabled={
                                loading ||
                                username.length === 0 ||
                                password.length === 0
                            }
                        >
                            Login
                        </Button>
                    </FormItem>
                </Grid>
            </Form>
        </Box>
    );
};

export default Login;
