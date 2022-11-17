import Navigation from './navigation';
import { Flex, Tractor } from '@aircall/tractor';

const App = () => (
    <Tractor injectStyle>
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Navigation />
        </Flex>
    </Tractor>
);

export default App;
