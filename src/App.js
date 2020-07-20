import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Spinner from "./shared/components/Spinner";
import ParticlesBg from 'particles-bg';

import Welcome from './Components/Welcome';

const App = () => {

    const isLoading = useSelector(state => state.config.isLoading);

    const routes = () => {
        return (<Switch>
            <Route exact path="/" component={Welcome}/>
        </Switch>);
    };

    return (
        <div className='bootstap-layout'>
            <div className='container'>
                <BrowserRouter>
                    <div className='root-component'>
                        <Spinner show={isLoading}/>
                        {routes}
                        <ParticlesBg type="random" bg={true}/>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );

};

export default App;
