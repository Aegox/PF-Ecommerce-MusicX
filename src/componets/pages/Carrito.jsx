import {Link} from "react-router-dom";
import {db} from "../../firebaseInicial/firebase";
import { collection, getDocs } from "firebase/firestore";
import styleCarrito from "../../css/Carrito.module.css";
import {useEffect , useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as actions from "../../redux/actions/carritoAction";


const Carrito = () => {
    const [total, setTotal] = useState(0);
    const infoTotal = [];
    const productos = useSelector((store) => store.carrito.productos); 
    const dispatch = useDispatch();
  
   

    useEffect(() => {
        dispatch(actions.getProductos())
    }, [dispatch])
    console.log(productos) 

    const handleQuitarProducto = (id) => {
        dispatch(actions.quitarProducto(id))
    }
    
    productos.forEach((producto) => infoTotal.push(`${producto.nombre} (1)`))
  

    
    return (
        <div className={styleCarrito.container}>
            <div className={styleCarrito.nav}>
                <Link to="/">
                    <h2>Volver</h2>
                </Link>      
            </div>
            <div className={styleCarrito.productContainer}>
                    {productos.map(data => {
                        return (
                            <div className={styleCarrito.product}>
                                <img src={data.imagen} alt="" width="150px"/>
                                <div className={styleCarrito.detailProduct}>
                                    <h1>{data.nombre}</h1>
                                    <h2>Autor:{data.autor}</h2>
                                    <h2>Tiempo:{data.tiempo}</h2>
                                </div>
                                <h2>{data.precio} USD</h2>
                                <button onClick={() => handleQuitarProducto(data.nombre)}><strong>X</strong></button> 
                                                            </div>
                        )
                    })}
            </div>
            <div className={styleCarrito.navCount}>
                <div>
                    <h1>TOTAL = {productos.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.precio,
                        total
                    )
                    } <strong>USD</strong></h1>
                </div>
                <div>
                    <p>{infoTotal.join(" , ")}</p>
                </div>
                <div>
                    
                </div>
            </div>


        </div>
    )
};

export default Carrito;
