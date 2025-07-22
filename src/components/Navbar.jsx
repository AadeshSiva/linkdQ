// JOTAI
import { useAtom } from "jotai"
import { opencreate } from '../jotai'

export default function Navbar() {
    const [opncreate, setopncreate] = useAtom(opencreate);
    const createlinkdq = () => {
        let linkdq = JSON.parse(localStorage.getItem('linkdq'));

        if (!linkdq) {
            linkdq = [];
            localStorage.setItem('linkdq', JSON.stringify(linkdq));
            alert('created Storage');
        }

    }
    return (
        <nav className='navbar'>
            <p className="logo">linkd<span>Q</span></p>
            <p className="create" onClick={() => { setopncreate(!opncreate); createlinkdq() }}>{opncreate ? 'close' : 'Create+'}</p>
        </nav>
    )
}