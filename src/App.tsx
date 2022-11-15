import { Tractor, Spacer, Typography } from '@aircall/tractor';

const App = () => (
    <Tractor injectStyle>
        <Spacer space="s">
            <Typography variant="displayM">Hello</Typography>
            <Typography variant="displayL">World</Typography>
        </Spacer>
    </Tractor>
);

export default App;
