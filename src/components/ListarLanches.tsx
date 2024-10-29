'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPen } from 'react-icons/fa';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

interface Ingrediente {
  ingrediente: {
    nome: string;
  };
}

interface Lanche {
  id_lanche: number;
  nome_lanche: string;
  ingredientes: Ingrediente[];
  preco_lanche: string | null;
}

const ListarLanches = () => {
  const [lanches, setLanches] = useState<Lanche[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchLanches = async () => {
      const response = await fetch("https://gustavomoreirase.pythonanywhere.com/lanche/");
      const data = await response.json();
      setLanches(data);
    };
    fetchLanches();
  }, []);

  const filteredLanches = lanches.filter((lanche) =>
    lanche.nome_lanche && lanche.nome_lanche.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    router.push(`/CadastrarLanches?id=${id}`); 
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`https://gustavomoreirase.pythonanywhere.com/lanche/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setLanches(prevLanches => prevLanches.filter(lanche => lanche.id_lanche !== id));
      toast.success('Lanche excluído com sucesso!', {
        position: "top-right",
        autoClose: 2000,
        draggable: false,
      });
    } else {
      toast.error('Erro ao excluir lanche!', {
        position: "top-right",
        autoClose: 2000,
        draggable: false,
      });
    }
  };

  const handleVinculo = (id: number) => {
    router.push(`/ListarLanches/vinculo?id=${id}`);
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
        <h1 style={titleStyle}>Lanches</h1>
        <Link href="/CadastrarLanches" style={{ textDecoration: 'none' }}>
          <button style={newButtonStyle}>+ Novo</button>
        </Link>
      </div>

      <div style={filterContainerStyle}>
        <label style={filterLabelStyle}>Filtro Lanches</label>
        <input
          type="text"
          placeholder="Pesquisar lanche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      <div style={listContainerStyle}>
        <div style={listHeaderStyle}>
          <span style={headerColumnStyle}>Nome do lanche</span>
          <span style={headerColumnStyle}>Ingredientes</span>
          <span style={headerColumnStyle}>Valor</span>
          <span style={headerColumnStyle}>Ações</span>
        </div >
       
        {filteredLanches.map((lanche) => (
          <div key={lanche.id_lanche} style={itemStyle}>
            <span style={nameStyle}>{lanche.nome_lanche}</span>
            <span style={ingredientesStyle}>
              {lanche.ingredientes.length > 0 
                ? lanche.ingredientes.map(ingrediente => ingrediente.ingrediente.nome).join(', ')
                : 'Nenhum ingrediente'}
            </span>
            <span style={valorStyle}>
              R$ {lanche.preco_lanche ? Number(lanche.preco_lanche).toFixed(2) : 'N/A'}
            </span>
            <div style={actionIconsStyle}>
              <span style={iconStyle} onClick={() => handleVinculo(lanche.id_lanche)}><FaLink style={{ color: '#002751'}} /></span>
              <span style={iconStyle} onClick={() => handleEdit(lanche.id_lanche)}><FaPen style={{ color: '#FBC02D'}}/></span>
              <span style={iconStyle} onClick={() => handleDelete(lanche.id_lanche)}><FaRegTrashAlt style={{ color: 'red'}}/></span>
            </div>
          </div>
        ))}
 
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: 'linear-gradient(90deg, rgba(164,0,0,1) 26%, rgba(255,0,0,1) 56%);',
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
  width: '100%',
  maxWidth: '360px',
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
  display: 'grid',
  gridTemplateColumns: '2fr 3fr 1fr 1fr',
  fontWeight: 'bold',
  paddingBottom: '10px',
  borderBottom: '2px solid #e1e1e1',
  textAlign: 'center',
  gap: '10px',
};

const itemStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '2fr 3fr 1fr 1fr',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #e1e1e1',
  gap: '10px',
};

const headerColumnStyle: React.CSSProperties = {
  textAlign: 'center',
};

const nameStyle: React.CSSProperties = {
  textAlign: 'center',
};

const ingredientesStyle: React.CSSProperties = {
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const valorStyle: React.CSSProperties = {
  textAlign: 'center',
};

const actionIconsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};





const iconStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontSize: '20px',
};



export default ListarLanches;
