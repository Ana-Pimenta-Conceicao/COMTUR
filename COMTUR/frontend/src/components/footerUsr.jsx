import React from 'react';
import logoJales from '../assets/logoJales.svg'
import { Clock, Envelope, FacebookLogo, InstagramLogo, MapPinLine, Phone, YoutubeLogo } from '@phosphor-icons/react';

const FooterUsr = () => {
    return (
        <footer className=" bg-black">
            <div className=" mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex ">
                    <div className="pb-6 pl-24 pt-5 pr-28">
                        <a href="https://www.jales.sp.gov.br" className="flex items-center">
                            <img src={logoJales} className="w-36 me-3" alt="Logo de Jales" />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <div className="inline-flex text-sm font-semibold text-white pb-0">
                                <MapPinLine size={18} className='mr-1' />
                                Endereço
                            </div>
                            <div className='pt-0'>
                                <a href="https://www.google.com/maps/place/Prefeitura+Municipal+de+Jales/@-20.2725793,-50.549165,17z/data=!3m1!4b1!4m6!3m5!1s0x94982efd4780448d:0xee03b8e2b0695cc3!8m2!3d-20.2725793!4d-50.549165!16s%2Fg%2F1pty2w88m?hl=pt-BR&entry=ttu"
                                    className="text-white text-xs hover:underline">R. Cinco, 2266 - Centro, Jales - SP, 15700-010</a>
                            </div>

                            <div className="inline-flex pt-3 text-sm font-semibold text-white">
                                <Envelope size={18} className='mr-1' />
                                Email
                            </div>

                            <div className='pt-0'>
                                <a href="turismo@jales.sp.gov.br"
                                    className="text-white text-xs hover:underline">turismo@jales.sp.gov.br</a>
                            </div>

                            <div className="inline-flex pt-3 text-sm font-semibold text-white">
                                <Phone size={18} className='mr-1' />
                                Telefone
                            </div>

                            <div className='pt-0'>
                                <h3 className=" text-white text-xs hover:underline">(17) 3622-3000</h3>
                            </div>

                            <div className="inline-flex pt-3 text-sm font-semibold  text-white">
                                <Clock size={18} className='mr-1'/>
                                Funcionamento
                            </div>

                            <div className='pt-0'>
                                <h3 className=" text-white text-xs hover:underline">Segunda à Sexta-Feira, das 08hrs às 16hrs</h3>
                            </div>
                        </div>


                        <div className='pl-24'>
                            <h2 className="text-sm font-semibold  text-white">A Cidade</h2>
                            <h3><a href="#" className="hover:underline text-white font-light text-xs">História</a></h3>
                            <h3><a href="https://www.google.com/maps/place/Jales+-+SP/@-20.2639822,-50.7225613,11z/data=!3m1!4b1!4m6!3m5!1s0x94982ed91ee5916b:0xc2006d92e99cf00a!8m2!3d-20.2686396!4d-50.5490456!16zL20vMDQxZ2Y0?hl=pt-BR&entry=ttu"
                                className="hover:underline text-white font-light text-xs">Localização</a></h3>

                            <h2 className="text-sm font-semibold pt-5 text-white">Para Empresas</h2>
                            <h3><a href="#" className="hover:underline text-white font-light text-xs">Divulgue Aqui</a></h3>
                            <h3><a href="#" className="hover:underline text-white font-light text-xs">Atualização Cadastral</a></h3>
                        </div>

                        <div className='pl-20 '>
                            <h2 className="text-sm font-semibold pb-2 text-white">Redes Sociais</h2>
                            <div className='inline-flex'>
                                <a href="https://www.facebook.com/prefeituradejales/?locale=pt_BR" className="text-white ">
                                    <FacebookLogo size={20} />
                                    <span className="sr-only">Facebook page</span>
                                </a>

                                <a href="https://www.instagram.com/prefeituradejales/" className="pl-2 text-white">
                                    <InstagramLogo size={20} />
                                    <span className="sr-only">Instagram page</span>
                                </a>

                                <a href="https://www.youtube.com/@prefeituradejales2403" className="pl-2 text-white">
                                    <YoutubeLogo size={22} />
                                    <span className="sr-only">Youtube page</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full bg-[#FFD121] h-6 justify-center items-center text-xs' >
                © COPYRIGHT 2023
            </div>
        </footer>
    );
};

export default FooterUsr; 