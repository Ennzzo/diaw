package br.pucminas.aluguel.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

    private final JdbcTemplate jdbcTemplate;

    public StatusService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean bancoOnline() {
        try {
            jdbcTemplate.queryForObject("select 1", Integer.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
