import {
  ELIMINAR_PRODUCTO,
  PAGAR,
  DETALLE_UN_PRODUCTO,
  ADD_PRODUCTOS,
  ADD_PRODUCTO,
  LIMPIAR_PRODUCTO_DETALLE,
  ADD_BIBLIOTECA,
} from "../types/carritoTypes.js";

import { allDb, db } from "../../firebaseInicial/firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const pagarCarrito = () => {
  return "Aun no se hace";
};

//RECIBE EL ID EL PRODUCTO AGREGADO AL CARRITO PARA PASARSELO AL REDUCER Y QUE LO ELIMINE.
export const quitarProducto = (id) => {
  return (dispatch) => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };
};

export const getProducto = (id) => {
  return async (dispatch) => {
    const docRef = allDb.doc(db, "productos", `${id}`);
    const docSnap = await allDb.getDoc(docRef);
    dispatch({
      type: DETALLE_UN_PRODUCTO,
      payload: { ...docSnap.data(), id: docSnap.id },
    });
  };
};

export const getProductos = () => {
  return async (dispatch) => {
    const allProducts = [];
    const firebaseProducts = await getDocs(collection(db, "productos"));
    await firebaseProducts.forEach((doc) => {
      allProducts.push({ ...doc.data(), id: doc.id });
    });
    console.log(allProducts);
    dispatch({
      type: ADD_PRODUCTOS,
      payload: allProducts,
    });
  };
};

export const addProducto = (producto) => {
  return {
    type: ADD_PRODUCTO,
    payload: {
      producto,
    },
  };
};

export const LimpiarDetalleProd = () => {
  return {
    type: LIMPIAR_PRODUCTO_DETALLE,
    payload: {},
  };
};

export const addBiblioteca = (productos, idUser) => {
  return async (dispatch) => {
    const usuario = allDb.doc(db, "usuarios", idUser);
    const userData = await allDb.getDoc(usuario);
    const bibliotecaPrev = userData.data().biblioteca;
    await updateDoc(usuario, {biblioteca: [...bibliotecaPrev, ...productos]})
    dispatch({
      type: ADD_BIBLIOTECA
    });
  };
};
