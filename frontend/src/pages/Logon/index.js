import React from 'react'; 
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { useState } from 'react';

export default function Logon(props) {
    const [id, setID] = useState('');

    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        

        const data = {id};

        try {
            const response = await api.post('sessions', data);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile');
        } catch (error) {
            console.log(error);
            alert("ID não encontrado");
        }
        
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="be the hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça o seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange = {e => setID(e.target.value)}
                        />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="router-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}