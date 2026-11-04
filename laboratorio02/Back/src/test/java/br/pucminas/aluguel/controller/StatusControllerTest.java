package br.pucminas.aluguel.controller;

import br.pucminas.aluguel.service.StatusService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("StatusController")
class StatusControllerTest {

    @Mock
    private StatusService statusService;

    @InjectMocks
    private StatusController statusController;

    @Test
    void mostraBancoOnline() throws Exception {
        when(statusService.bancoOnline()).thenReturn(true);
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(statusController).build();

        mockMvc.perform(get("/api/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.api").value("online"))
                .andExpect(jsonPath("$.banco").value("online"));
    }

    @Test
    void mostraBancoOffline() throws Exception {
        when(statusService.bancoOnline()).thenReturn(false);
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(statusController).build();

        mockMvc.perform(get("/"))
                .andExpect(jsonPath("$.banco").value("offline"));
    }
}
