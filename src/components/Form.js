import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import PropTypes from "prop-types";

import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Form = ({ setMoneda, setCriptomoneda }) => {
  //[estado, actualizador]
  const [listacripto, setListaCripto] = useState([]);
  //[estado, actualizador]
  const [error, setError] = useState(false);

  //array de monedas con su codigo
  const MONEDAS = [
    { codigo: "ARS", nombre: "Peso Argentino" },
    { codigo: "USD", nombre: "Dolar Estadounidense" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" }
  ];

  //[estado, actualizador]
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  //[estado, actualizador]
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  //genera la consulta a la API cada vez que se genere un cambio
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setListaCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //previene el actuar por defecto del form, valida y envia los datos
  const cotizarMoneda = e => {
    e.preventDefault();

    //valida
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }
    setError(false);
    //envia los datos
    setMoneda(moneda);
    setCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Seleccione ambos campos" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Cotizar!" />
    </form>
  );
};

Form.propTypes = {
  setMoneda: PropTypes.func.isRequired,
  setCriptomoneda: PropTypes.func.isRequired
};

export default Form;
