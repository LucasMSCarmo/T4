import React from 'react';
import { Cliente } from "./dados";

type Props = {
    cliente: Cliente;
    tema: string;
    onFechar: () => void;
}

export default function DetalhesCliente(props: Props) {
    const { cliente, tema, onFechar } = props;

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content border-0 shadow-sm">
                    <div className="modal-header py-3" style={{
                        backgroundColor: tema,
                        color: 'white',
                        borderBottom: '2px solid rgba(255,255,255,0.1)'
                    }}>
                        <h5 className="modal-title fw-bold mb-0">
                            <i className="bi bi-person-circle me-2"></i>
                            Detalhes do Cliente: {cliente.nome}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onFechar} aria-label="Fechar"></button>
                    </div>

                    <div className="modal-body p-4">
                        <div className="row">
                            <div className="col-md-6 border-end">
                                <h6 className="fw-bold text-muted mb-3">Informações Pessoais</h6>
                                <p><strong>Nome:</strong> {cliente.nome}</p>
                                <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                                <p><strong>Email:</strong> {cliente.email || 'Não informado'}</p>

                                <h6 className="fw-bold text-muted mt-4 mb-3">Telefones</h6>
                                {cliente.telefones.length > 0 ? (
                                    cliente.telefones.map(tel => (
                                        <p key={tel.id} className="mb-1">({tel.ddd}) {tel.numero}</p>
                                    ))
                                ) : (
                                    <p className="text-muted">Nenhum telefone cadastrado.</p>
                                )}
                            </div>
                            <div className="col-md-6 ps-4">
                                <h6 className="fw-bold text-muted mb-3">Endereço</h6>
                                <p><strong>Rua:</strong> {cliente.endereco.rua}, {cliente.endereco.numero}</p>
                                <p><strong>Bairro:</strong> {cliente.endereco.bairro}</p>
                                <p><strong>Cidade:</strong> {cliente.endereco.cidade} - {cliente.endereco.estado}</p>
                                <p><strong>CEP:</strong> {cliente.endereco.codigoPostal}</p>
                                <p><strong>Info Adicionais:</strong> {cliente.endereco.informacoesAdicionais || 'Nenhuma'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-top-0">
                        <button className="btn btn-outline-secondary rounded-2" onClick={onFechar}>
                            <i className="bi bi-x-lg me-1"></i>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}