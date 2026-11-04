package br.pucminas.aluguel.controller;

import br.pucminas.aluguel.dto.AutomovelRequest;
import br.pucminas.aluguel.exception.GlobalExceptionHandler;
import br.pucminas.aluguel.exception.NaoEncontradoException;
import br.pucminas.aluguel.exception.RegraNegocioException;
import br.pucminas.aluguel.model.Automovel;
import br.pucminas.aluguel.service.AutomovelService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// testa os endpoints sem subir o Spring nem o banco
@ExtendWith(MockitoExtension.class)
@DisplayName("AutomovelController")
class AutomovelControllerTest {

    private static final String URL = "/api/automoveis";

    @Mock
    private AutomovelService automovelService;

    @InjectMocks
    private AutomovelController automovelController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(automovelController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    private Automovel automovel() {
        Automovel a = new Automovel();
        a.setId(1L);
        a.setMatricula("MAT1");
        a.setAno(2023);
        a.setMarca("Fiat");
        a.setModelo("Argo");
        a.setPlaca("ABC1D23");
        return a;
    }

    @Test
    void listaAutomoveis() throws Exception {
        when(automovelService.listar()).thenReturn(List.of(automovel()));

        mockMvc.perform(get(URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].placa").value("ABC1D23"));
    }

    @Test
    void criaAutomovelERetorna201() throws Exception {
        when(automovelService.criar(any(AutomovelRequest.class))).thenReturn(automovel());

        mockMvc.perform(post(URL).contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"matricula":"MAT1","ano":2023,"marca":"Fiat","modelo":"Argo","placa":"abc1d23"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void retorna400QuandoFaltaCampo() throws Exception {
        mockMvc.perform(post(URL).contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"matricula":"MAT1","ano":2023,"marca":"","modelo":"Argo","placa":"ABC1D23"}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").exists());
        verify(automovelService, never()).criar(any());
    }

    @Test
    void retorna400QuandoPlacaRepetida() throws Exception {
        when(automovelService.criar(any(AutomovelRequest.class)))
                .thenThrow(new RegraNegocioException("Ja existe um automovel com essa placa"));

        mockMvc.perform(post(URL).contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"matricula":"MAT1","ano":2023,"marca":"Fiat","modelo":"Argo","placa":"ABC1D23"}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Ja existe um automovel com essa placa"));
    }

    @Test
    void retorna404QuandoNaoExiste() throws Exception {
        when(automovelService.buscar(99L)).thenThrow(new NaoEncontradoException("Automovel nao encontrado"));

        mockMvc.perform(get(URL + "/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.caminho").value(URL + "/99"));
    }

    @Test
    void retorna400QuandoJsonInvalido() throws Exception {
        mockMvc.perform(post(URL).contentType(MediaType.APPLICATION_JSON).content("{ invalido"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("O corpo da requisicao nao e um JSON valido"));
    }
}
