import Image from "next/image"
export default function Home(){
  return(
    <div>
      <h1>Olá, seja bem-vindo</h1>
      <div>
      <Image
       src="/public/hamburguer.jpg"
       alt="teste"
       width={300}
       height={200}
       quality={75}
       style = {{maxWidth: '100%', height: 'auto' }}
      />
      </div>
    </div>
  )
}