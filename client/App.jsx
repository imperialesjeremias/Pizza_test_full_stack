import {Routes, Route} from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Home from './src/pages/Home';

function App() { 
    return(
        <>
        <Navbar/>
         <Routes>
            <Route to="/" element={Home}/>
         </Routes>
        </>
    )
}

export default App;