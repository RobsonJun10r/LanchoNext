'use client';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'; // Para capturar os parâmetros da URL

interface Ingrediente {
  idIngrediente: string;
  quantidade: string;
}

interface Lanche {
  id_lanche: string;
  nome_lanche: string;
}

interface IngredienteData {
  id_ingrediente: string;
  nome_ingrediente: string;
}

const VincularIngredientes: React.FC = () => {
  const [lanches, setLanches] = useState<Lanche[]>([]); 
  const [ingredientes, setIngredientes] = useState<IngredienteData[]>([]); 
  const [selectedLancheId, setSelectedLancheId] = useState<string>('');
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<Ingrediente[]>([{ idIngrediente: '', quantidade: '' }]);
  
  const searchParams = useSearchParams(); 
  const lancheIdFromURL = searchParams.get('id'); 

  // Buscar os lanches
  useEffect(() => {
    const fetchLanches = async () => {
      const response = await fetch('https://gustavomoreirase.pythonanywhere.com/lanche/');
      const data: Lanche[] = await response.json();
      setLanches(data); 
      
      // Se um lanche foi passado pela URL, definir como o lanche selecionado
      if (lancheIdFromURL) {
        setSelectedLancheId(lancheIdFromURL);
      }
    };
    fetchLanches();
  }, [lancheIdFromURL]);

  // Buscar os ingredientes
  useEffect(() => {
    const fetchIngredientes = async () => {
      const response = await fetch('https://gustavomoreirase.pythonanywhere.com/ingrediente/');
      const data: IngredienteData[] = await response.json();
      setIngredientes(data); 
    };
    fetchIngredientes();
  }, []);

  const handleAddIngrediente = () => {
    setIngredientesSelecionados([...ingredientesSelecionados, { idIngrediente: '', quantidade: '' }]);
  };

  const handleIngredienteChange = (index: number, field: keyof Ingrediente, value: string) => {
    const newIngredientes = [...ingredientesSelecionados];
    newIngredientes[index][field] = value;
    setIngredientesSelecionados(newIngredientes);
  };

  const handleSubmitVinculo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLancheId) {
      toast.error('Selecione um lanche!', { position: "top-right", autoClose: 2000, hideProgressBar: true });
      return;
    }

    try {
      for (const ingrediente of ingredientesSelecionados) {
        if (!ingrediente.idIngrediente || !ingrediente.quantidade) {
          toast.error('Todos os ingredientes devem ter um ID e quantidade!', { position: "top-right", autoClose: 2000, hideProgressBar: true });
          continue;
        }

        const response = await fetch('https://gustavomoreirase.pythonanywhere.com/lanches_ingredientes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_lanche: selectedLancheId,
            id_ingrediente: ingrediente.idIngrediente,
            quantidade: ingrediente.quantidade,
          }),
        });

        if (!response.ok) throw new Error('Erro ao vincular ingrediente');
      }

      toast.success('Ingredientes vinculados com sucesso!', { position: "top-right", autoClose: 2000, hideProgressBar: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Erro ao vincular ingredientes!', { position: "top-right", autoClose: 2000, hideProgressBar: true });
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer style={{ fontSize: '14px', width: 'auto' }} position="top-right" autoClose={2000} hideProgressBar closeOnClick pauseOnHover draggable />
      <h1 style={titleStyle}>Vincular Ingredientes ao Lanche</h1>
      <form onSubmit={handleSubmitVinculo} style={formStyle}>
        {/* Seleção do lanche com preenchimento automático via URL */}
        <select value={selectedLancheId} onChange={(e) => setSelectedLancheId(e.target.value)} style={inputStyle}>
          <option value="">Selecione um Lanche</option>
          {lanches.map((lanche) => (
            <option key={lanche.id_lanche} value={lanche.id_lanche}>
              {lanche.nome_lanche}
            </option>
          ))}
        </select>

        {ingredientesSelecionados.map((ingrediente, index) => (
          <div key={index} style={ingredienteRowStyle}>
            <select
              value={ingrediente.idIngrediente}
              onChange={(e) => handleIngredienteChange(index, 'idIngrediente', e.target.value)}
              style={inputStyle}
            >
              <option value="">Selecione um Ingrediente</option>
              {ingredientes.map((ingredienteItem) => (
                <option key={ingredienteItem.id_ingrediente} value={ingredienteItem.id_ingrediente}>
                  {ingredienteItem.nome_ingrediente}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={ingrediente.quantidade}
              onChange={(e) => handleIngredienteChange(index, 'quantidade', e.target.value)}
              placeholder="Quantidade"
              style={inputStyle}
            />
          </div>
        ))}

        <button type="button" onClick={handleAddIngrediente} style={buttonStyle}>Adicionar Ingrediente</button>
        <button type="submit" style={buttonStyle}>Vincular Ingredientes</button>
      </form>
    </div>
  );
};

// Estilos
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

const ingredienteRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '10px',
};

export default VincularIngredientes;