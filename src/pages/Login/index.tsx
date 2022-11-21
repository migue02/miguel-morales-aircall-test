import {
    Box,
    Button,
    Form,
    FormItem,
    FormItemStatuses,
    Grid,
    Icon,
    SpinnerOutlined,
    TextFieldInput,
} from '@aircall/tractor';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validationStatus, setValidationStatus] =
        useState<FormItemStatuses>('success');

    const { loading, loggedIn, login } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            login(username, password);
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
                    <FormItem label="Username" name="username">
                        <TextFieldInput
                            value={username}
                            onChange={({ target }) => setUserName(target.value)}
                        />
                    </FormItem>
                    <FormItem
                        label="Password"
                        name="password"
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
                            {loading ? (
                                <Icon component={SpinnerOutlined} spin />
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </FormItem>
                </Grid>
            </Form>
        </Box>
    );
};

export default Login;
