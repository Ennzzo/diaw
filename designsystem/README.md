# AlugaCar DS

Design System do front-end do [Laboratório 02 - Aluguel de Carros](../laboratorio02).
Ele reúne em uma página as decisões visuais do sistema, para facilitar a manutenção e a
escalabilidade do front-end.

Aluno: Enzo Bambirra

## O que tem

- **Cores:** escalas de azul, laranja e neutro, cores de feedback e tokens semânticos
  (light e dark). Explicação da harmonia complementar no círculo cromático.
- **Tipografia:** Racing Sans One (marca e títulos de destaque) e Inter (interface), com escala
  de tamanhos em `rem`.
- **Espaçamentos e arredondamentos:** escala com base de 4px, raios e sombras.
- **Logos:** versões horizontal, empilhada e ícone, para fundo claro e escuro.
- **Temas:** light e dark com troca pelo botão do cabeçalho, salvando a escolha.
- **Ícones:** ícones do `lucide-react` usados no sistema, tamanhos e regras.
- **Botões:** componente `<Botao />` com variantes, tamanhos, só ícone e estados.
- **Componentes:** badges de status, campos de formulário e alertas.
- **Acessibilidade:** contraste WCAG calculado a partir das cores e diretrizes de uso.

## Estrutura

```
designsystem/
├── index.html
└── src/
    ├── css/tokens.css
    ├── components/
    ├── data/cores.js
    └── utils/
```

Para usar os tokens em outro projeto basta importar o `src/css/tokens.css` e usar as variáveis
`--cor-*`, `--esp-*`, `--raio-*` e `--texto-*`. O tema escuro é ativado com
`data-tema="escuro"` no `<html>`.

## Como rodar

```bash
cd designsystem
npm install
npm run dev
```

Abra http://localhost:5173.

## Tecnologias

- React 19 + Vite
- CSS puro com variáveis
- lucide-react
