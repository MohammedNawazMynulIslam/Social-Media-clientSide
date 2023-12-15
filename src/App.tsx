import { Home } from './Pages/Home/Home';
import { MainLayout } from './Pages/Home/MainLayout';
import { Authlayout } from './form/Authlayout/Authlayout';
import { SignIn } from './form/SignIn/SignIn';
import { SignUp } from './form/SignUp/SignUp';
import { Toaster } from "@/components/ui/toaster"
import './global.css'
import {Routes, Route} from 'react-router-dom';
const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                <Route element={<Authlayout></Authlayout>}>
                <Route path="/signIn" element={<SignIn />}/>
                <Route path="/signUp" element={<SignUp />}/>
                </Route>
                <Route element={<MainLayout></MainLayout>}>
                <Route path="/" element={<Home />}/>
                </Route>
            </Routes>
            <Toaster/>
        </main>
    );
};

export default App;