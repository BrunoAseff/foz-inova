"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Anchor, Fish, MapPin, Search, User, Waves, Loader2, AlertTriangle, ShipWheel } from "lucide-react";
import { useState, type FormEvent } from 'react';
import Image from "next/image";

type Fish = {
    name: string;
    description: string;
    image: string;
};

type Fisher = {
    id: string;
    name: string;
    age: number;
    experience: number;
    region: 'Itajaí' | 'Navegantes' | 'Balneário Camboriú';
    bio: string;
    avatar: string; 
    fishes: Fish[];
};

const mockData: Record<string, Fisher> = {
    '8202840': {
        id: '8202840',
        name: 'Carlos Mendes',
        age: 58,
        experience: 40,
        region: 'Itajaí',
        avatar: '/mendes.png', 
        bio: 'Pescador desde os 18 anos, seguindo a tradição de meu pai e avô. Conheço cada canto da Foz do Rio Itajaí-Açu e me orgulho de trazer o peixe mais fresco para a mesa da nossa gente.',
        fishes: [
            { name: 'Camarão-Rosa', description: 'O mais apreciado da nossa costa, perfeito para moquecas e risotos.', image: '/camarao.jpg' },
            { name: 'Linguado', description: 'Carne branca e achatada, excelente para grelhados com molhos cítricos.', image: '/linguado.jpg' },
            { name: 'Pescada-Branca', description: 'Um clássico da nossa culinária, com carne macia que desfia facilmente.', image: '/pescada.jpg' },
            { name: 'Pescada-Branca', description: 'Um clássico da nossa culinária, com carne macia que desfia facilmente.', image: '/tainha.jpg' },

        ],
    },
    '3150771': {
        id: '3150771',
        name: 'Juliana Santos',
        age: 42,
        experience: 20,
        region: 'Navegantes',
        avatar: '/mendes.png',
        bio: 'Especialista em pesca de arrasto de camarão e peixes de menor porte. Acredito na pesca sustentável para garantir o futuro do nosso oceano e da nossa comunidade.',
        fishes: [
            { name: 'Camarão-Rosa', description: 'O mais apreciado da nossa costa, perfeito para moquecas e risotos.', image: '/camarao.jpg' },
            { name: 'Linguado', description: 'Carne branca e achatada, excelente para grelhados com molhos cítricos.', image: '/linguado.jpg' },
            { name: 'Pescada-Branca', description: 'Um clássico da nossa culinária, com carne macia que desfia facilmente.', image: '/pescada.jpg' },
        ],
    }
};

const mapUrls: Record<Fisher['region'], string> = {
    'Itajaí': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56965.88998249219!2d-48.69372935136718!3d-26.909566100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b6732899e289%3A0x6440d43a12513920!2sItaja%C3%AD%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1717865667654!5m2!1spt-BR!2sbr',
    'Navegantes': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56977.8386762319!2d-48.69460984863282!3d-26.88358249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b51833753c15%3A0x3347f8a335a732e7!2sNavegantes%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1717865717758!5m2!1spt-BR!2sbr',
    'Balneário Camboriú': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56919.148102418606!2d-48.6577883513672!3d-26.9936881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b61218525389%3A0x7d97f2b963133373!2sBalne%C3%A1rio%20Cambori%C3%BA%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1717865747432!5m2!1spt-BR!2sbr',
}


type SearchStatus = 'idle' | 'searching' | 'found' | 'notFound';

export default function Rastreabilidade() {
    const [serialNumber, setSerialNumber] = useState('');
    const [status, setStatus] = useState<SearchStatus>('idle');
    const [fisher, setFisher] = useState<Fisher | null>(null);

    const handleSearch = async (event: FormEvent) => {
        event.preventDefault();
        setFisher(null);
        setStatus('searching');
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        const foundFisher = mockData[serialNumber.replace('#', '')];

        if (foundFisher) {
            setFisher(foundFisher);
            setStatus('found');
        } else {
            setStatus('notFound');
        }
    };

    return (
        <div className="min-h-full w-full antialiased bg-gray-50/50">
            <div className="container mx-auto px-4 py-16 md:py-24">

                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-fell">
                        Rastreie a <span className="text-primary">Origem</span> do seu Pescado
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Digite o código do selo para descobrir a história por trás do seu peixe, desde o pescador que o capturou até as águas de onde ele veio.
                    </p>
                </div>

                <div className="mt-12 max-w-lg mx-auto">
                    <form onSubmit={handleSearch} className="flex gap-3 items-center">
                        <Input
                            type="text"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            placeholder="Digite o código do selo, ex: #8202840"
                            className="h-14 text-lg flex-1 shadow-sm"
                            required
                        />
                        <Button type="submit" size="lg" className="h-14 w-16 shadow-sm" disabled={status === 'searching'}>
                            {status === 'searching' ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <Search className="h-6 w-6" />
                            )}
                        </Button>
                    </form>
                </div>


                <div className="mt-16">
                    {status === 'found' && fisher && (
                        <div className="grid lg:grid-cols-5 gap-8 animate-fade-in-up">
                            <Card className="lg:col-span-2 shadow-xl bg-white/80 backdrop-blur-lg">
                                <CardHeader className="text-center">
                                    <Image src={fisher.avatar} alt={fisher.name} width={120} height={120} className="rounded-full mx-auto border-4 border-primary/50 shadow-md" />
                                    <CardTitle className="mt-4 text-3xl font-fell">{fisher.name}</CardTitle>
                                    <CardDescription>Pescador Artesanal</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 text-gray-700">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <User className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold">Sobre</h4>
                                                <p className="text-gray-600">{fisher.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Anchor className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold">Experiência</h4>
                                                <p className="text-gray-600">{fisher.experience} anos no mar, {fisher.age} anos de idade.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold">Região de Pesca</h4>
                                                <p className="text-gray-600">{fisher.region}, Santa Catarina</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="aspect-video w-full rounded-lg overflow-hidden border">
                                        <iframe
                                            src={mapUrls[fisher.region]}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="lg:col-span-3 h-fit shadow-xl bg-white/80 backdrop-blur-lg flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Waves className="h-7 w-7 text-primary" />
                                        <CardTitle className="text-3xl font-fell">Pescados Comuns</CardTitle>
                                    </div>
                                    <CardDescription>Estes são alguns dos peixes que {fisher.name.split(' ')[0]} costuma trazer do mar.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 flex items-center justify-center">
                                    <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md" opts={{ loop: true }}>
                                        <CarouselContent>
                                            {fisher.fishes.map((fish, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="p-1">
                                                        <Card className="overflow-hidden">
                                                            <CardContent className="flex flex-col items-center justify-center py-6 px-12 gap-4">
                                                                <Image src={fish.image} alt={fish.name} width={250} height={250} className="aspect-square object-cover rounded-lg" />
                                                                <div className="text-center">
                                                                    <h3 className="text-xl font-semibold text-gray-800">{fish.name}</h3>
                                                                    <p className="text-gray-600 mt-1">{fish.description}</p>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="ml-12" />
                                        <CarouselNext className="mr-12" />
                                    </Carousel>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {status === 'notFound' && (
                        <div className="text-center animate-fade-in-up max-w-md mx-auto">
                           <Card className="py-12 px-6 shadow-xl bg-white/80 backdrop-blur-lg">
                                <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-800 font-fell">Selo não encontrado</h3>
                                <p className="text-gray-600 mt-2">O código "{serialNumber}" não corresponde a nenhum pescador em nosso sistema. Por favor, verifique o código e tente novamente.</p>
                           </Card>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}