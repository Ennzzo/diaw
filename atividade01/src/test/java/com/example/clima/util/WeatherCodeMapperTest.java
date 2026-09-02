package com.example.clima.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WeatherCodeMapperTest {

    @Test
    void deveTraduzirCodigosConhecidos() {
        assertEquals("Ceu limpo", WeatherCodeMapper.descrever(0));
        assertEquals("Nublado", WeatherCodeMapper.descrever(3));
        assertEquals("Chuva", WeatherCodeMapper.descrever(65));
    }

    @Test
    void deveTratarCodigoDesconhecidoOuNulo() {
        assertEquals("Condicao desconhecida (codigo 999)", WeatherCodeMapper.descrever(999));
        assertEquals("Condicao indisponivel", WeatherCodeMapper.descrever(null));
    }
}
