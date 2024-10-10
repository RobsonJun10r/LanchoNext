'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadastrarProdutos = () => {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const idParam = queryParams.get('id');
    const nomeParam = queryParams.get('nome');

    if (idParam) {
      setId(Number(idParam));
    }
    if (nomeParam) {
      setNome(decodeURIComponent(nomeParam));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return; 

    if (id) {

      const response = await fetch(`https://gustavomoreirase.pythonanywhere.com/ingrediente/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome_ingrediente: nome }),
      });
      if (response.ok) {
        toast.success('Produto editado com sucesso!', { 
          position: "top-right", 
          autoClose: 2000, 
          hideProgressBar: true,
          draggable: false,
        });
        router.push('/ListarProdutos'); 
      } else {
        toast.error('Erro ao editar produto!', { 
          position: "top-right", 
          autoClose: 2000, 
          hideProgressBar: true,
          draggable: false,
        });
      }
    } else {
      // Criar novo produto
      const response = await fetch("https://gustavomoreirase.pythonanywhere.com/ingrediente/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome_ingrediente: nome }),
      });
      if (response.ok) {
        toast.success('Produto cadastrado com sucesso!', { 
          position: "top-right", 
          autoClose: 2000, 
          hideProgressBar: true,
          draggable: false,
        });
        router.push('/ListarProdutos'); 
      } else {
        toast.error('Erro ao cadastrar produto!', { 
          position: "top-right", 
          autoClose: 2000, 
          hideProgressBar: true,
          draggable: false,
        });
      }
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer 
        style={{ fontSize: '14px', width: 'auto' }}
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
      <h1 style={titleStyle}>{id ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do produto"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>{id ? 'Salvar' : 'Cadastrar'}</button>
      </form>
    </div>
  );
};

// CSS Styles
const containerStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#f8f9fa',
  maxWidth: '600px', 
  margin: '0 auto',
};

const titleStyle: React.CSSProperties = {
  marginBottom: '20px',
  textAlign: 'center', 
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px', 
};

const inputStyle: React.CSSProperties = {
  width: '100%', 
  maxWidth: '100%', 
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box', 
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#a70000',
  color: '#fff',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default CadastrarProdutos;
