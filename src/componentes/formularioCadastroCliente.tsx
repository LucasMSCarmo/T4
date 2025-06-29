import React, { useState } from 'react';
import { Cliente, Endereco, Telefone } from "./dados";

export type NovoClientePayload = Omit<Cliente, 'id' | 'endereco' | 'telefones'> & {
    endereco: Omit<Endereco, 'id'>;
    telefones: Omit<Telefone, 'id'>[];
};

type Props = {
    tema: string;
    onSubmit: (cliente: NovoClientePayload) => void;
}

export default function FormularioCadastroCliente(props: Props) {
    const { tema, onSubmit } = props;

    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState<Omit<Endereco, 'id'>>({ estado: '', cidade: '', bairro: '', rua: '', numero: '', codigoPostal: '', informacoesAdicionais: '' });
    const [telefones, setTelefones] = useState<Omit<Telefone, 'id'>[]>([]);
    const [telTemp, setTelTemp] = useState({ ddd: '', numero: '' });

    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEndereco(prev => ({ ...prev, [name]: value }));
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
        setTelefones(prev => [...prev, telTemp]);
        setTelTemp({ ddd: '', numero: '' });
    };

    const removerTelefone = (indexToRemove: number) => {
        setTelefones(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const novoCliente: NovoClientePayload = {
            nome,
            nomeSocial,
            email,
            endereco,
            telefones,
        };

        onSubmit(novoCliente);
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header" style={{ backgroundColor: tema, color: 'white' }}>
                <h5 className="mb-0">Cadastro de Cliente</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <h6 className="card-title">Dados Pessoais</h6>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Nome</label>
                            <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Nome Social</label>
                            <input type="text" className="form-control" value={nomeSocial} onChange={e => setNomeSocial(e.target.value)} />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <h6 className="card-title mt-3">Endereço</h6>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Rua</label>
                            <input type="text" className="form-control" name="rua" value={endereco.rua} onChange={handleEnderecoChange} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Número</label>
                            <input type="text" className="form-control" name="numero" value={endereco.numero} onChange={handleEnderecoChange} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Bairro</label>
                            <input type="text" className="form-control" name="bairro" value={endereco.bairro} onChange={handleEnderecoChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Cidade</label>
                            <input type="text" className="form-control" name="cidade" value={endereco.cidade} onChange={handleEnderecoChange} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Estado</label>
                            <input type="text" className="form-control" name="estado" value={endereco.estado} onChange={handleEnderecoChange} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>CEP</label>
                            <input type="text" className="form-control" name="codigoPostal" value={endereco.codigoPostal} onChange={handleEnderecoChange} />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Informações Adicionais</label>
                            <input type="text" className="form-control" name="informacoesAdicionais" value={endereco.informacoesAdicionais} onChange={handleEnderecoChange} />
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-muted mb-3"><i className="bi bi-telephone me-2" style={{ color: tema }}></i>Telefones</h6>
                            {telefones.length > 0 && (
                                <div className="mb-3">
                                    {telefones.map((tel, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <span>({tel.ddd}) {tel.numero}</span>
                                            <button type="button" className="btn btn-outline-danger btn-sm rounded-2" onClick={() => removerTelefone(index)} title="Remover Telefone">
                                                <i className="bi bi-trash"></i>
                                            
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label small fw-semibold">DDD</label>
                                    <input type="text" className="form-control" name="ddd" value={telTemp.ddd} onChange={handleTelefoneChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Número</label>
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
                    <div className="d-flex justify-content-end mt-3"><button className="btn btn-primary" type="submit" style={{ backgroundColor: tema }}>Cadastrar</button></div>
                </form>
            </div>
        </div>
    );
}