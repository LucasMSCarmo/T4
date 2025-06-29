import { Cliente } from "./dados";

type Props = {
    tema: string;
    clientes: Cliente[];
    onDetalhes: (cliente: Cliente) => void;
    onEditar: (cliente: Cliente) => void;
    onExcluir: (cliente: Cliente) => void;
}

export default function ListaCliente(props: Props) {
    const { tema, clientes, onDetalhes, onEditar, onExcluir } = props;

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header py-3" style={{
                backgroundColor: tema,
                color: 'white',
                borderBottom: '2px solid rgba(255,255,255,0.1)'
            }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">
                        <i className="bi bi-people me-2"></i>
                        Clientes
                    </h5>
                    <span className="badge bg-white text-dark">
                        {clientes.length} registros
                    </span>
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th className="ps-4">Nome</th>
                                <th>Nome Social</th>
                                <th>Email</th>
                                <th>Cidade</th>
                                <th className="pe-4 text-end">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id} className="align-middle">
                                    <td className="ps-4 fw-semibold">{cliente.nome}</td>
                                    <td className="text-muted">{cliente.nomeSocial}</td>
                                    <td className="text-muted">{cliente.email || 'N/A'}</td>
                                    <td>{cliente.endereco.cidade}</td>
                                    <td className="pe-4 text-end">
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-primary rounded-2"
                                                onClick={() => onDetalhes(cliente)}
                                                title="Detalhes"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-warning rounded-2"
                                                onClick={() => onEditar(cliente)}
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger rounded-2"
                                                onClick={() => onExcluir(cliente)}
                                                title="Excluir"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {clientes.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        <i className="bi bi-people" style={{ fontSize: '2rem' }}></i>
                        <p className="mt-2">Nenhum cliente cadastrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}