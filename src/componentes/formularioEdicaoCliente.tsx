import React, { useState } from 'react';
import { Cliente, Telefone } from "./dados";

type Props = {
    tema: string;
    cliente: Cliente;
    onSalvar: (clienteEditado: Cliente) => void;
    onFechar: () => void;
}

export default function FormularioEdicaoCliente(props: Props) {
    const { tema, cliente, onSalvar, onFechar } = props;

    const [nome, setNome] = useState(cliente.nome);
    const [nomeSocial, setNomeSocial] = useState(cliente.nomeSocial);
    const [email, setEmail] = useState(cliente.email || '');
    
    const [endereco, setEndereco] = useState(cliente.endereco);
    
    const [telefones, setTelefones] = useState<Telefone[]>(cliente.telefones);
    const [telTemp, setTelTemp] = useState({ ddd: '', numero: '' });

    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEndereco(prev => ({...prev, [name]: value}));
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTelTemp(prev => ({ ...prev, [name]: value }));
    };

    const adicionarTelefone = () => {
        if (!telTemp.ddd || !telTemp.numero) {
            alert("Por favor, preencha o DDD e o número do telefone.");
            return;
        }
        const novoTelefone: Telefone = { id: Date.now(), ...telTemp };
        setTelefones(prev => [...prev, novoTelefone]);
        setTelTemp({ ddd: '', numero: '' });
    };

    const removerTelefone = (idParaRemover: number) => {
        setTelefones(prev => prev.filter(tel => tel.id !== idParaRemover));
    };

    const handleSalvar = (event: React.FormEvent) => {
        event.preventDefault();
        const clienteEditado: Cliente = {
            ...cliente,
            nome,
            nomeSocial,
            email,
            endereco,
            telefones
        };
        onSalvar(clienteEditado);
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header py-3" style={{ backgroundColor: tema, color: 'white' }}>
                        <h5 className="modal-title fw-bold">Editando Cliente: {cliente.nome}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onFechar}></button>
                    </div>

                    <form onSubmit={handleSalvar}>
                        <div className="modal-body p-4">
                            <h6 className="fw-bold text-muted mb-3">Dados Pessoais</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>Nome Completo*</label>
                                    <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label>Nome Social</label>
                                    <input type="text" className="form-control" value={nomeSocial} onChange={e => setNomeSocial(e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                               </div>
                            </div>
                            
                            <h6 className="fw-bold text-muted mt-4 mb-3">Endereço</h6>
                            <div className="row g-3">
                                <div className="col-md-8">
                                    <label>Rua</label>
                                    <input type="text" className="form-control" name="rua" value={endereco.rua} onChange={handleEnderecoChange} />
                                </div>
                                <div className="col-md-4">
                                    <label>Número</label>
                                    <input type="text" className="form-control" name="numero" value={endereco.numero} onChange={handleEnderecoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label>Bairro</label>
                                    <input type="text" className="form-control" name="bairro" value={endereco.bairro} onChange={handleEnderecoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label>Cidade</label>
                                    <input type="text" className="form-control" name="cidade" value={endereco.cidade} onChange={handleEnderecoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label>Estado</label>
                                    <input type="text" className="form-control" name="estado" value={endereco.estado} onChange={handleEnderecoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label>CEP</label>
                                    <input type="text" className="form-control" name="codigoPostal" value={endereco.codigoPostal} onChange={handleEnderecoChange} />
                                </div>
                                <div className="col-12">
                                    <label>Informações Adicionais</label>
                                    <input type="text" className="form-control" name="informacoesAdicionais" value={endereco.informacoesAdicionais} onChange={handleEnderecoChange} />
                                </div>
                            </div>

                            <div className="card border-0 shadow-sm mt-4">
                                <div className="card-body p-4">
                                    <h6 className="fw-bold text-muted mb-3"><i className="bi bi-telephone me-2" style={{ color: tema }}></i>Telefones</h6>
                                    {telefones.length > 0 && (
                                        <div className="mb-3">
                                            {telefones.map(tel => (
                                                <div key={tel.id} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style={{ backgroundColor: '#f8f9fa' }}>
                                                    <span>({tel.ddd}) {tel.numero}</span>
                                                    <button type="button" className="btn btn-outline-danger btn-sm rounded-2" onClick={() => removerTelefone(tel.id)} title="Remover Telefone">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label>DDD</label>
                                            <input type="text" className="form-control" name="ddd" value={telTemp.ddd} onChange={handleTelefoneChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Número</label>
                                            <input type="text" className="form-control" name="numero" value={telTemp.numero} onChange={handleTelefoneChange} />
                                        </div>
                                        <div className="col-md-2 d-flex align-items-end">
                                            <button type="button" className="btn btn-sm w-100" style={{ backgroundColor: tema, color: 'white' }} onClick={adicionarTelefone}>
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0"><button type="button" className="btn btn-outline-secondary" onClick={onFechar}>Cancelar</button><button type="submit" className="btn" style={{ backgroundColor: tema, color: 'white' }}>Salvar Alterações</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}