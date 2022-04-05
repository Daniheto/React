import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ItemDetail from "./ItemDetail";
import { db } from "./Firebase";
import {
  getDoc,
  collection,
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

let detalleProducto = [
  {
    indice: 1,
    nombre: "producto1",
    precio: 100,
    stock: 5,
    categoria: "indumentaria",
  },
  {
    indice: 2,
    nombre: "producto2",
    precio: 200,
    stock: 5,
    categoria: "elementos",
  },
  {
    indice: 3,
    nombre: "producto3",
    precio: 300,
    stock: 5,
    categoria: "objetos",
  },
  {
    indice: 4,
    nombre: "producto4",
    precio: 400,
    stock: 5,
    categoria: "indumentaria",
  },
  {
    indice: 5,
    nombre: "producto5",
    precio: 500,
    stock: 5,
    categoria: "elementos",
  },
  {
    indice: 6,
    nombre: "producto6",
    precio: 600,
    stock: 5,
    categoria: "objetos",
  },
  {
    indice: 7,
    nombre: "producto7",
    precio: 700,
    stock: 5,
    categoria: "indumentaria",
  },
  {
    indice: 8,
    nombre: "producto8",
    precio: 800,
    stock: 5,
    categoria: "elementos",
  },
];

const ItemDetailContainer = (producto) => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const productosCollection = collection(db, "productos");
    const miFiltro = query(productosCollection, where("id", "==", Number(id)));
    const documentos = getDocs(miFiltro);

    documentos
      .then((respuesta) =>
        setProductos(respuesta.docs.map((doc) => doc.data())[0])
      )
      .catch((errorApi) => toast.error("Error al cargar el detalle"))
      .finally(() => setLoading(false));

    // const promesa = new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res(detalleProducto);
    //   }, 1000);
    // });
    // promesa
    //   .then((respuestaApi) => {
    //     setProductos(respuestaApi.find((producto) => producto.indice == +id));
    //   })
  }, [id]);

  return (
    <div className="detalle">
      <p>{loading ? "Cargando..." : "Ya tenes el detalle del producto"}</p>
      <ItemDetail key={producto.id} productos={productos} />
    </div>
  );
};

export default ItemDetailContainer;
