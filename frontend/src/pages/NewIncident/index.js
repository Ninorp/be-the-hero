import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleCadastro(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,            
        };

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            alert("Novo caso cadastrado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Não foi possível cadastrar, tente novamente.");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="be the hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver
                        isso.
                    </p>

                    <Link className="router-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar a página principal
                    </Link>
                </section>

                <form onSubmit={handleCadastro}>
                    <input 
                        placeholder="Título do novo caso" 
                        value={title}
                        onChange={e => {setTitle(e.target.value)}}
                        />
                    <textarea 
                        placeholder="Descrição do novo caso"
                        value={description}
                        onChange={e => { setDescription(e.target.value) }}
                        />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => { setValue(e.target.value) }}
                        />
                

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}