import { Flex, Tractor } from '@aircall/tractor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navigation from './navigation';

const queryClient = new QueryClient();

const App = () => (
    <Tractor injectStyle>
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <QueryClientProvider client={queryClient}>
                <Navigation />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Flex>
    </Tractor>
);

export default App;
