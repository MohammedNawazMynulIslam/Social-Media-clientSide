import { Home } from './Pages/Home/Home';
import { MainLayout } from './Pages/Home/MainLayout';

import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';
import './global.css'
import {Routes, Route} from 'react-router-dom';
const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>

                <Route path="/signIn" element={<SignIn />}/>
                <Route path="/signUp" element={<SignUp />}/>
                <Route element={<MainLayout></MainLayout>}>
                <Route path="/" element={<Home />}/>
                </Route>
            </Routes>
        </main>
    );
};

export default App;