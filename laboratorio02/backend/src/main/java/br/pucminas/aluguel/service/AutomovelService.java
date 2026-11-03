package br.pucminas.aluguel.service;

import br.pucminas.aluguel.dto.AutomovelRequest;
import br.pucminas.aluguel.exception.NaoEncontradoException;
import br.pucminas.aluguel.exception.RegraNegocioException;
import br.pucminas.aluguel.model.Automovel;
import br.pucminas.aluguel.repository.AutomovelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutomovelService {

    private final AutomovelRepository automovelRepository;

    public AutomovelService(AutomovelRepository automovelRepository) {
        this.automovelRepository = automovelRepository;
    }

    public List<Automovel> listar() {
        return automovelRepository.findAll();
    }

    public Automovel buscar(Long id) {
        return automovelRepository.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("Automovel nao encontrado"));
    }

    public Automovel criar(AutomovelRequest dados) {
        String placa = dados.placa().toUpperCase();
        if (automovelRepository.existsByPlaca(placa)) {
            throw new RegraNegocioException("Ja existe um automovel com essa placa");
        }
        if (automovelRepository.existsByMatricula(dados.matricula())) {
            throw new RegraNegocioException("Ja existe um automovel com essa matricula");
        }
        Automovel automovel = new Automovel();
        preencher(automovel, dados);
        return automovelRepository.save(automovel);
    }

    public Automovel atualizar(Long id, AutomovelRequest dados) {
        Automovel automovel = buscar(id);
        preencher(automovel, dados);
        return automovelRepository.save(automovel);
    }

    public void excluir(Long id) {
        automovelRepository.delete(buscar(id));
    }

    private void preencher(Automovel automovel, AutomovelRequest dados) {
        automovel.setMatricula(dados.matricula());
        automovel.setAno(dados.ano());
        automovel.setMarca(dados.marca());
        automovel.setModelo(dados.modelo());
        automovel.setPlaca(dados.placa().toUpperCase());
    }
}
