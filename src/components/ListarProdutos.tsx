'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Produto{
  id_ingrediente: number;
  nome_ingrediente: string;
}
const ListarProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();


  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await fetch("https://gustavomoreirase.pythonanywhere.com/ingrediente/");
      const data = await response.json();
      setProdutos(data);
    };
    fetchProdutos();
  }, []);


  const filteredProdutos = produtos.filter((produto) =>
    produto.nome_ingrediente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number, nome: string) => {
    router.push(`/CadastrarProdutos?id=${id}&nome=${encodeURIComponent(nome)}`);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`https://gustavomoreirase.pythonanywhere.com/ingrediente/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id_ingrediente !== id));
      toast.success('Produto excluído com sucesso!', { 
        position: "top-right", 
        autoClose: 2000, 
        hideProgressBar: true,
        draggable: false,
      });
    } else {
      toast.error('Erro ao excluir produto!', { 
        position: "top-right", 
        autoClose: 2000, 
        hideProgressBar: true,
        draggable: false,
      });
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
      <div style={headerStyle}>
        <h1 style={titleStyle}>Produtos</h1>
        <Link href="/CadastrarProdutos" style={{ textDecoration: 'none' }}>
          <button style={newButtonStyle}>+ Novo</button>
        </Link>
      </div>

   
      <div style={filterContainerStyle}>
        <label style={filterLabelStyle}>Filtro de Produtos</label>
        <input 
          type="text" 
          placeholder="Pesquisar produto" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={searchInputStyle}
        />
      </div>

      <div style={listContainerStyle}>
        <div style={listHeaderStyle}>
          <label style={labelStyle}>Nome do produto</label>
          <span style={acoesLabelStyle}>Ações</span>
        </div>
        {filteredProdutos.map((produto, index) => (
          <div key={index} style={itemStyle}>
            <span>{produto.nome_ingrediente}</span>
            <div style={actionIconsStyle}>
              <span style={iconStyle} onClick={() => handleEdit(produto.id_ingrediente, produto.nome_ingrediente)}>✏️</span>
              <span style={iconStyle} onClick={() => handleDelete(produto.id_ingrediente)}>🗑️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const containerStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#f8f9fa',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#a70000',
  padding: '15px',
  color: '#fff',
  borderRadius: '5px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
};

const newButtonStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#e63946',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};


const filterContainerStyle: React.CSSProperties = {
  marginTop: '15px',
  marginBottom: '20px',
};

const filterLabelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '16px',
};


const searchInputStyle: React.CSSProperties = {
  padding: '8px',
  width: '20%',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const listContainerStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const listHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 'bold',
  paddingBottom: '10px',
  borderBottom: '2px solid #e1e1e1',
};

const labelStyle: React.CSSProperties = {
  marginBottom: '10px',
};

const acoesLabelStyle: React.CSSProperties = {
  marginBottom: '10px',
  textAlign: 'center',
  width: '100px',
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #e1e1e1',
};

const actionIconsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  width: '100px',
};

const iconStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontSize: '18px',
};

export default ListarProdutos;
