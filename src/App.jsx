import './App.css'


// JOTAI
import { useAtom } from "jotai"
import { opencreate } from './jotai'

import Create from './components/create';
import Navbar from './components/Navbar';
import Home from './components/Home';
function App() {
  const [opncreate, setopncreate] = useAtom(opencreate);
  return (
    <>
      <main className="container">
        <Navbar />
        <div className="inner-container">

          {opncreate ? <Create /> : <Home />}
        </div>
        <p className="name">developed by <a href="https://aadeshsiva.vercel.app/">me</a></p>
      </main>
    </>
  )
}

export default App
