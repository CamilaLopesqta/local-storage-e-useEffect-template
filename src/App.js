import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };

  // const salvarLista = () => {
  // const listaString = JSON.stringify(listaCompras);
  // localStorage.setItem("lista", listaString);
  // } --substituído pelo useEffect abaixo

  //guardando a lista no estado e no local storage
  useEffect(() => {
    if (listaCompras.length > 0) {
      const listaString = JSON.stringify(listaCompras);
      localStorage.setItem("lista", listaString);
    }
  }, [listaCompras]);

  // const pegarLista = () => {
  //   const listaSalva = JSON.parse(localStorage.getItem("lista"));
  //   setListaCompras(listaSalva)
  // } --substituído pelo useEffect

  useEffect(() => {
    if (listaCompras) {
      const listaSalva = JSON.parse(localStorage.getItem("lista"));
      if (listaSalva) {
        setListaCompras(listaSalva);
      }
    }
  }, []);

  const limparLista = () => {
    localStorage.removeItem("lista");
    setListaCompras([]);
  };

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      {/* <button onClick={salvarLista} >Salvar Lista</button> */}
      {/* <button onClick={pegarLista} >Pegar lista</button> */}
      <button onClick={limparLista}>Limpar lista</button>
      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
