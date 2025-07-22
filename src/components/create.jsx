import '../App.css';
import { useState } from 'react';

// JOTAI
import { useAtom } from "jotai"
import { opencreate } from '../jotai'
export default function Create() {
    const [opncreate, setopncreate] = useAtom(opencreate);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    const handleCreate = () => {
        if (!title.trim() || !link.trim()) {
            alert('Both title and link are required.');
            return;
        }

        let linkdq = JSON.parse(localStorage.getItem('linkdq')) || [];

        const newLink = {
            id: Date.now(),
            title: title.trim(),
            link: link.trim()
        };

        linkdq.push(newLink);
        localStorage.setItem('linkdq', JSON.stringify(linkdq));
        setTitle('');
        setLink('');
        setopncreate(false);
        alert('Link added!');
    };

    return (
        <main className="create-container">
            <div className="create-top">
                <input
                    type="text"
                    className="create-title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p className="create-btn" onClick={handleCreate}>create</p>
            </div>
            <textarea
                className="create-link"
                placeholder="Paste your link here."
                value={link}
                onChange={(e) => setLink(e.target.value)}
            ></textarea>
        </main>
    );
}
