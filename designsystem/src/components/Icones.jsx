import {
  BadgeCheck,
  CalendarDays,
  CarFront,
  Check,
  FileSignature,
  Landmark,
  LogOut,
  Moon,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  User,
  Users,
  X,
  XCircle,
} from 'lucide-react'
import '../css/Icones.css'

const icones = [
  { Icone: CarFront, nome: 'CarFront', uso: 'Marca, automóveis' },
  { Icone: CalendarDays, nome: 'CalendarDays', uso: 'Datas do aluguel' },
  { Icone: FileSignature, nome: 'FileSignature', uso: 'Contrato' },
  { Icone: Landmark, nome: 'Landmark', uso: 'Banco / crédito' },
  { Icone: BadgeCheck, nome: 'BadgeCheck', uso: 'Aprovar pedido' },
  { Icone: XCircle, nome: 'XCircle', uso: 'Cancelar pedido' },
  { Icone: Plus, nome: 'Plus', uso: 'Novo cadastro' },
  { Icone: Pencil, nome: 'Pencil', uso: 'Editar' },
  { Icone: Trash2, nome: 'Trash2', uso: 'Excluir' },
  { Icone: Search, nome: 'Search', uso: 'Buscar' },
  { Icone: User, nome: 'User', uso: 'Cliente' },
  { Icone: Users, nome: 'Users', uso: 'Lista de clientes' },
  { Icone: Check, nome: 'Check', uso: 'Confirmar' },
  { Icone: X, nome: 'X', uso: 'Fechar modal' },
  { Icone: LogOut, nome: 'LogOut', uso: 'Sair' },
  { Icone: Sun, nome: 'Sun / Moon', uso: 'Trocar tema', Extra: Moon },
]

function Icones() {
  return (
    <>
      <div className="icones">
        {icones.map(({ Icone, Extra, nome, uso }) => (
          <div key={nome} className="icone">
            <span className="icone-desenho">
              <Icone size={24} aria-hidden="true" />
              {Extra && <Extra size={24} aria-hidden="true" />}
            </span>
            <code>{nome}</code>
            <span>{uso}</span>
          </div>
        ))}
      </div>

      <h3>Tamanhos</h3>
      <div className="icone-tamanhos cartao">
        {[16, 20, 24, 32].map((t) => (
          <div key={t}>
            <CarFront size={t} aria-hidden="true" />
            <span>{t}px</span>
          </div>
        ))}
      </div>

      <h3>Regras</h3>
      <ul className="regras">
        <li>
          <strong>Biblioteca:</strong> só <code>lucide-react</code>, traço 2 e cantos
          arredondados. Não misturar com outras bibliotecas.
        </li>
        <li>
          <strong>16px</strong> em badges e tabelas, <strong>18–20px</strong> dentro de botões e na
          navbar, <strong>24px</strong> sozinhos e <strong>32px+</strong> em estados vazios.
        </li>
        <li>
          O ícone herda a cor do texto (<code>currentColor</code>). Ícone decorativo leva{' '}
          <code>aria-hidden</code>; botão só com ícone precisa de <code>aria-label</code>.
        </li>
      </ul>
    </>
  )
}

export default Icones
