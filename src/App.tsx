import Navigation from './navigation';
import { UserProvider } from './contexts/UserContext';
import { Flex, Tractor } from '@aircall/tractor';

const App = () => (
    <UserProvider>
        <Tractor injectStyle>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Navigation />
            </Flex>
        </Tractor>
    </UserProvider>
);

export default App;
