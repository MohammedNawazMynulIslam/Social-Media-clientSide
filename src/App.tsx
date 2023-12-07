import './global.css'
import {Routes, Route} from 'react-router-dom';
const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                <Route path="/signIn" element={<SignIn />}/>
                <Route path="/" element={<HomePage />}/>

            </Routes>
        </main>
    );
};

export default App;