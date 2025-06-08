"use client"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Fish, ShieldCheck, Anchor, CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { useState, type FormEvent } from 'react';
import Image from "next/image";

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Selo() {
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setStatus('submitting');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
    };

    const benefits = [
        {
            icon: <Fish className="h-6 w-6 text-primary" />,
            title: "Valorização do seu Pescado",
            description: "Conecte-se diretamente a restaurantes e peixarias, garantindo vendas melhores e mais visibilidade para o seu trabalho.",
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-primary" />,
            title: "Selo de Qualidade e Confiança",
            description: "Nosso selo, atestado por laboratórios, comprova a origem e a qualidade do seu peixe, aumentando a confiança do consumidor.",
        },
        {
            icon: <Anchor className="h-6 w-6 text-primary" />,
            title: "Fortalecimento da Cultura Local",
            description: "Faça parte de um movimento que fortalece a identidade pesqueira do Vale do Itajaí e preserva a pesca artesanal para o futuro.",
        },
    ];

    return (
        <div className="min-h-full w-full antialiased relative flex items-center justify-center">
            <div className="relative z-10 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    <div className="space-y-6">
                        <div className="flex gap-10">
                        <Image src="/peixe.png" width="150" height="150" alt="Logo mostrando um selo" />
                         <h1 className="text-5xl md:text-5xl font-bold text-gray-800 font-fell">
                            Junte-se à <span className="text-primary">Origem da Foz</span> e valorize seu trabalho.
                        </h1>
                        </div>
                       
                        <p className="text-lg text-gray-600">
                            Nosso selo conecta seu pescado artesanal aos melhores estabelecimentos, gerando mais reconhecimento e lucro para você e mais confiança para o consumidor.
                        </p>
                        <div className="space-y-4 pt-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <Card className="w-full max-w-md shadow-lg bg-white/80 backdrop-blur-lg">
                            <CardHeader className="text-center">
                                {status !== 'success' ? (<>
                                <CardTitle className="text-2xl font-fell">Solicite seu selo</CardTitle>
                                <CardDescription>Preencha os dados e entraremos em contato.</CardDescription>
                                </>) : 
                            (
                     <>
                                <CardTitle className="text-2xl"></CardTitle>
                                <CardDescription></CardDescription>
                                </> 

                            )
                            
                            }
                            </CardHeader>
                            <CardContent>
                                {status === 'success' ? (
                                    <div className="text-center py-10">
                                        <PartyPopper className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-800">Inscrição enviada!</h3>
                                        <p className="text-gray-600 mt-2">Obrigado! Nossa equipe analisará suas informações e entrará em contato em breve.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="nome" className="font-medium text-gray-700">Nome Completo</label>
                                            <Input type="text" id="nome" placeholder="Seu nome" required />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="cidade" className="font-medium text-gray-700">Cidade/Região de Pesca</label>
                                            <Input type="text" id="cidade" placeholder="Ex: Itajaí, SC" required />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="telefone" className="font-medium text-gray-700">Telefone para Contato (WhatsApp)</label>
                                            <Input type="tel" id="telefone" placeholder="(47) 99999-9999" required />
                                        </div>
                                        <Button type="submit" className="flex gap-2 items-center justify-center w-full py-3" disabled={status === 'submitting'}>
                                            {status === 'submitting' ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    Quero meu Selo <ArrowRight className="h-5 w-5" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}