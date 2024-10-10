
import Link from "next/link"
export default function Menu(){
    return(
        <div>
            <nav>
            <Link href="/">
                <button style={buttonStyle}>Início</button>
                </Link>
                <Link href="/ListarLanches">
                <button style={buttonStyle}>Lanches</button>
                </Link>
                <Link href="/ListarProdutos">
                <button style={buttonStyle}>Produtos</button>
                </Link>
            </nav>
        </div>
    )
}

const buttonStyle: React.CSSProperties = {
    color: "F7F7F7",
    fontSize: "20px",
  };