import linked from '/linkedin.svg';
import github from '/github.svg';
import empty from '/empty.svg';

import { BiCopy } from 'react-icons/bi';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useState, useEffect } from 'react';

// JOTAI
import { useAtom } from 'jotai';
import { opencreate } from '../jotai';

export default function Home() {
    const [opncreate, setopncreate] = useAtom(opencreate);
    const [copiedId, setCopiedId] = useState(null);
    const [linkdq, setLinkdq] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('linkdq')) || [];
        setLinkdq(stored);
    }, []);

    const handleCopy = async (link, id) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(link);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = link;
                textArea.style.position = 'fixed';
                textArea.style.top = 0;
                textArea.style.left = 0;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 1000);
        } catch (err) {
            console.error('Copy failed:', err);
            alert('Copy failed.');
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this link?");
        if (!confirmDelete) return;

        const updated = linkdq.filter(link => link.id !== id);
        setLinkdq(updated);
        localStorage.setItem('linkdq', JSON.stringify(updated));
    };

    return (
        <main className="home-container">
            {linkdq.map((l) => (
                <div
                    className="links"
                    key={l.id}
                    onDoubleClick={() => handleDelete(l.id)}
                >
                    <div className="links-content">
                        <img
                            src={
                                l.link.toLowerCase().includes('linkedin') ? linked :
                                    l.link.toLowerCase().includes('github') ? github :
                                        empty
                            }
                            alt="logo"
                        />
                        {l.title}
                    </div>
                    <span
                        className="links-inner-btns"
                        onClick={() => handleCopy(l.link, l.id)}
                        onTouchEnd={() => handleCopy(l.link, l.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {copiedId === l.id ? (
                            <IoIosCheckmarkCircle color="greenyellow" size={20} />
                        ) : (
                            <BiCopy size={20} />
                        )}
                    </span>
                </div>
            ))}
        </main>
    );
}
