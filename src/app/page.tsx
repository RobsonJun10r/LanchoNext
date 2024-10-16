import Image from "next/image"
export default function Home(){
  return(
    <div>
      <h1>Olá, seja bem-vindo</h1>
      <div>
      <Image
       src="/public/hamburguer.png"
       alt="teste"
       width={300}
       height={300}
       quality={75}
      />
      </div>
    </div>
  )
}