import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import css from "../../css/detailproducto.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { getProducto } from "../../redux/actions/carritoAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function DetailProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [presioProducto, setPresioProducto] = useState("");
  const { productoUnoDetalle } = useSelector((state) => state.carrito);
  const arryAux = [
    { nombre: "Licencia 1", id: "akshdsad3568", valor: 100 },
    { nombre: "Licencia 2", id: "aks1hd8", valor: 200 },
    { nombre: "Licencia 3", id: "aks3hd8", valor: 300 },
    { nombre: "Licencia 4", id: "aksh4d8", valor: 400 },
    { nombre: "Licencia 5", id: "aksh2d8", valor: 500 },
  ];

  useEffect(() => {
    dispatch(getProducto(id));
  }, [dispatch]);

  function handlerLicencia(e) {
    let btnSelec = document.getElementById(e.target.id).parentNode;
    let boton = document.getElementById(e.target.id).childNodes;
    boton[1].style.display = "block";
    btnSelec.setAttribute(
      "Class",
      `card ${css.cardProducto} ${css.cardSelect}`
    );
    precioTotal(e.target.id);
    for (let i = 0; i < arryAux.length; i++) {
      if (i != e.target.id) {
        let btnNoSelect = document.getElementById(i).parentNode;
        let botonNoSelect = document.getElementById(i).childNodes;
        botonNoSelect[1].style.display = "none";
        btnNoSelect.setAttribute("Class", `card ${css.cardProducto}`);
      }
    }
  }
  function precioTotal(i) {
    setPresioProducto(arryAux[i].valor);
  }

  return (
    <div>
      {console.log(productoUnoDetalle)}
      <div>
        <Container>
          <div Style="margin-top: 50px"></div>
          <Row>
            <Col>
              <div className={css.box}>
                <img
                  className={`${css.imagenportada} img-fluid`}
                  src={productoUnoDetalle.imagen}
                  alt=""
                />
                <div className={css.hover}>
                  <audio controls controlslist="nodownload">
                    <source
                      src="https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/BOM%20BAP%20TYPE%201%2FBASE%20BOMBAP%20TYPE.wav?alt=media&token=cde04954-46db-44aa-bbd6-1f7e1a97e3d0"
                      type="audio/wav"
                    />
                  </audio>
                </div>
              </div>
            </Col>
            <Col>
              <Row>
                <Col Style="padding-left: 30px;">
                  <h1>
                    {`${productoUnoDetalle.nombre} - ${productoUnoDetalle.autor}`}
                  </h1>
                  valor: $100 + licencia ${presioProducto}
                  <p Style="margin-top: 10px" className="text-break ">
                    {productoUnoDetalle.descripcion}
                  </p>
                </Col>
              </Row>
              <p className="text-center">Lista Licencias</p>
              <div className={`${css.divLicencias} shadow-sm `}>
                <ListGroup>
                  {arryAux.map((obj, indx) => (
                    <div key={indx} onClick={(e) => handlerLicencia(e)}>
                      <Card className={`${css.cardProducto}`}>
                        <Card.Body id={indx} value={obj.valor}>
                          {`${obj.nombre} detalle de la licencia' `}
                          <Button
                            name="boton"
                            className="float-end btn btn-primary"
                          >
                            ${obj.valor}
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={css.espaciado}></div>
      </div>
    </div>
  );
}
