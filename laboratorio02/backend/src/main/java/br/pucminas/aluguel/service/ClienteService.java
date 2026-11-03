package br.pucminas.aluguel.service;

import br.pucminas.aluguel.dto.ClienteRequest;
import br.pucminas.aluguel.dto.ClienteResponse;
import br.pucminas.aluguel.dto.RendimentoDTO;
import br.pucminas.aluguel.exception.NaoEncontradoException;
import br.pucminas.aluguel.exception.RegraNegocioException;
import br.pucminas.aluguel.model.Cliente;
import br.pucminas.aluguel.model.Rendimento;
import br.pucminas.aluguel.repository.ClienteRepository;
import br.pucminas.aluguel.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository clienteRepository, UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listar() {
        return clienteRepository.findAll().stream().map(ClienteResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscar(Long id) {
        return ClienteResponse.from(buscarCliente(id));
    }

    @Transactional
    public ClienteResponse criar(ClienteRequest dados) {
        if (usuarioRepository.existsByLogin(dados.login())) {
            throw new RegraNegocioException("Login ja esta em uso");
        }
        if (clienteRepository.existsByCpf(dados.cpf())) {
            throw new RegraNegocioException("CPF ja cadastrado");
        }
        if (dados.senha() == null || dados.senha().length() < 4) {
            throw new RegraNegocioException("A senha precisa ter pelo menos 4 caracteres");
        }

        Cliente cliente = new Cliente();
        cliente.setLogin(dados.login());
        cliente.setSenha(passwordEncoder.encode(dados.senha()));
        preencher(cliente, dados);
        return ClienteResponse.from(clienteRepository.save(cliente));
    }

    @Transactional
    public ClienteResponse atualizar(Long id, ClienteRequest dados) {
        Cliente cliente = buscarCliente(id);
        if (!cliente.getCpf().equals(dados.cpf()) && clienteRepository.existsByCpf(dados.cpf())) {
            throw new RegraNegocioException("CPF ja cadastrado");
        }
        if (dados.senha() != null && !dados.senha().isBlank()) {
            cliente.setSenha(passwordEncoder.encode(dados.senha()));
        }
        preencher(cliente, dados);
        return ClienteResponse.from(clienteRepository.save(cliente));
    }

    @Transactional
    public void excluir(Long id) {
        clienteRepository.delete(buscarCliente(id));
    }

    public Cliente buscarCliente(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("Cliente nao encontrado"));
    }

    private void preencher(Cliente cliente, ClienteRequest dados) {
        cliente.setNome(dados.nome());
        cliente.setRg(dados.rg());
        cliente.setCpf(dados.cpf());
        cliente.setEndereco(dados.endereco());
        cliente.setProfissao(dados.profissao());

        cliente.getRendimentos().clear();
        if (dados.rendimentos() != null) {
            for (RendimentoDTO r : dados.rendimentos()) {
                cliente.adicionarRendimento(new Rendimento(r.entidadeEmpregadora(), r.valor()));
            }
        }
    }
}
