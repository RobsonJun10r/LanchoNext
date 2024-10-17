import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="containerPage">
      <div>
        <h1 className="home">DATALANCHES</h1>
        <div className="card">
          <Link href="/ListarLanches">
            <Image
              src="/images/hamburguer.png"
              alt="Hamburguer"
              width={600}
              height={300}
              quality={75}
              style={{ maxWidth: "100%", height: "auto", cursor: 'pointer' }}
            />
          </Link>
        </div>
        
        <div className="card">
        <Link href="/ListarProdutos">
          <Image
            src="/images/produto.png"
            alt="Produtos"
            width={600}
            height={300}
            quality={75}
            style={{ maxWidth: "100%", height: "auto", cursor: 'pointer' }}
          />
          </Link>
        </div>
      </div>
    </div>
  );
}
