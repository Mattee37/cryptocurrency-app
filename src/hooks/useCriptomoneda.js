import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const useCriptomoneda = (label, stateInicial, opciones) => {
  //[estado, actualizador]
  const [state, setState] = useState(stateInicial);

  const Label = styled.label`
    font-family: "Bebas Neue", cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
  `;

  const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
  `;

  //esto es un hook personalizado, en este caso carga un componente que devuelve una etiqueta y un select que, carga cada option dependiendo de la respuesta de la API

  const SelecCripto = () => {
    return (
      <Fragment>
        <Label>{label}</Label>
        <Select onChange={e => setState(e.target.value)} value={state}>
          <option value="">-- Seleccione --</option>
          {opciones.map(opcion => (
            <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
              {opcion.CoinInfo.FullName}
            </option>
          ))}
        </Select>
      </Fragment>
    );
  };

  return [state, SelecCripto, setState];
};

useCriptomoneda.propTypes = {
  label: PropTypes.string.isRequired,
  stateInicial: PropTypes.func.isRequired,
  opciones: PropTypes.array.isRequired
};

export default useCriptomoneda;
