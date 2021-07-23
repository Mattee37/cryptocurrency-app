import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Resultado = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 30px;
  span {
    font-weight: bold;
  }
`;

const Result = ({ resultado }) => {
  //si no hay un resultado, retorna null y no carga el componente
  if (Object.keys(resultado).length === 0) return null;
  return (
    <Resultado>
      <Precio>
        El precio es: <span>{resultado.PRICE}</span>
      </Precio>
      <Info>
        Precio mas alto del dia: <span>{resultado.HIGHDAY}</span>
      </Info>
      <Info>
        Precio mas bajo del dia: <span>{resultado.LOWDAY}</span>
      </Info>
      <Info>
        Variacion en las ultimas 24 horas:{" "}
        <span>{resultado.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Ultima actualizacion: <span>{resultado.LASTUPDATE}</span>
      </Info>
    </Resultado>
  );
};

Result.propTypes = {
  resultado: PropTypes.object.isRequired
};

export default Result;
