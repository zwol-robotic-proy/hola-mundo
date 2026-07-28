'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', subject: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setStatus('success');
            setForm({ name: '', subject: '', email: '', message: '' });
        } else {
            setStatus('error');
        }
    };

    const feedback = {
        idle: { text: '\u00A0', class: 'p-1' },
        sending: { text: '\u00A0', class: 'p-1' },
        success: { text: '¡ENVIADO!', class: 'text-green-600 bg-white rounded-lg p-1' },
        error: { text: '¡Error!. Intenta otra vez.', class: 'text-red-600 bg-white rounded-lg p-1' },
    }[status];

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 mb-10 text-gray-200 font-bold">
            <div>
                <label htmlFor="name">Nombre</label>
                <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    className="w-full border rounded px-3 py-2" 
                    autoComplete="name"/>
            </div>
            <div>
                <label htmlFor="subject">Asunto</label>
                <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={handleChange}
                    className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    autoComplete="email"/>
            </div>
            <div>
                <label htmlFor="message">Mensaje</label>
                <textarea
                    id="message" name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    className="w-full border rounded px-3 py-2"/>
            </div>
            <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-black text-gray-200 hover:bg-gray-200 hover:text-black px-4 py-2 rounded">
                {status === 'sending' ? 'Enviando…' : 'Enviar Mensaje'}
            </button>
            <div className='flex w-full justify-center'>
                <p className={`mt-2 min-h-[1.5rem] text-sm font-bold ${feedback.class}`}>
                    {feedback.text}
                </p>
            </div>
        </form>
    );
};