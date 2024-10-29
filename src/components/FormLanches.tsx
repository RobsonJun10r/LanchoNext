'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadastrarLanche: React.FC = () => {
  const router = useRouter();
  const [nomeLanche, setNomeLanche] = useState<string>('');
  const [valorLanche, setValorLanche] = useState<string>('');

  const handleSubmitLanche = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeLanche || !valorLanche) {
      toast.error('Nome e valor do lanche são obrigatórios!', { position: "top-right", autoClose: 2000, hideProgressBar: true });
      return;
    }

    const valorNumerico = parseFloat(valorLanche);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      toast.error('O valor do lanche deve ser um número positivo!', { position: "top-right", autoClose: 2000, hideProgressBar: true });
      return;
    }

    try {
      const precoFormatado = valorNumerico.toFixed(2);

      const responseLanche = await fetch('https://gustavomoreirase.pythonanywhere.com/lanche/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome_lanche: nomeLanche,
          preco_lanche: precoFormatado
        }),
      });

      if (!responseLanche.ok) throw new Error('Erro ao cadastrar lanche');

      toast.success('Lanche cadastrado com sucesso!', { position: "top-right", autoClose: 2000, hideProgressBar: true });
      router.push('/ListarLanches'); 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Erro ao cadastrar lanche: ${error.message}`, { position: "top-right", autoClose: 2000, hideProgressBar: true });
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer style={{ fontSize: '14px', width: 'auto' }} position="top-right" autoClose={2000} hideProgressBar closeOnClick pauseOnHover draggable />

      <h1 style={titleStyle}>Cadastrar Lanche</h1>
      <form onSubmit={handleSubmitLanche} style={formStyle}>
        <label>
          Nome do Lanche
          <input
            type="text"
            value={nomeLanche}
            onChange={(e) => setNomeLanche(e.target.value)}
            placeholder="Nome do Lanche"
            style={inputStyle}
          />
        </label>
        <label>
          Valor do Lanche
          <input
            type="text"
            value={valorLanche}
            onChange={(e) => setValorLanche(e.target.value)}
            placeholder="Valor do Lanche"
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>Cadastrar Lanche</button>
      </form>
    </div>
  );
};

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

export default CadastrarLanche;
