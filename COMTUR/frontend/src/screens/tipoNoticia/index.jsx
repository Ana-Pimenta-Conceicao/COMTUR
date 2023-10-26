import React from 'react'
//import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "../tipoNoticia/index.css"

export default function TipoNoticia() {

    return (
        <div className="AlnAdminListaDeNotCia">
            <div className="AlnListaDeNoticias" style={{ width: 1100, height: 507, left: 318, top: 284, position: 'absolute' }}>
                <div className="Linha" style={{ width: 1099, height: 61, left: 1, top: 446, position: 'absolute' }}>
                    <div className="Rectangle" style={{ width: 60, height: 60, left: 1039, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="Rectangle" style={{ width: 1030, height: 60, left: 0, top: 1, position: 'absolute', background: '#F4F4F4', borderTopLeftRadius: 4, borderTopRightRadius: 4, border: '0.50px #3F3F3F solid' }} />
                    <div className="PalcoDaPraA" style={{ width: 252, height: 18, left: 10, top: 25, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Palco da Praça</div>
                </div>
                <div className="Linha" style={{ width: 1099, height: 61, left: 1, top: 366, position: 'absolute' }}>
                    <div className="Rectangle" style={{ width: 60, height: 60, left: 1039, top: 1, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="Rectangle" style={{ width: 1030, height: 60, left: 0, top: 0, position: 'absolute', background: '#F4F4F4', borderTopLeftRadius: 4, borderTopRightRadius: 4, border: '0.50px #3F3F3F solid' }} />
                    <div className="Bebedouro" style={{ width: 252, height: 18, left: 10, top: 24, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Bebedouro</div>
                </div>
                <div className="Linha" style={{ width: 1100, height: 61, left: 0, top: 291, position: 'absolute' }}>
                    <div className="Rectangle" style={{ width: 60, height: 60, left: 1040, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="Rectangle" style={{ width: 1030, height: 60, left: 0, top: 1, position: 'absolute', background: '#F4F4F4', borderTopLeftRadius: 4, borderTopRightRadius: 4, border: '0.50px #3F3F3F solid' }} />
                    <div className="Letreiro" style={{ width: 252, height: 18, left: 10, top: 25, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Letreiro</div>
                </div>
                <div className="Linha" style={{ width: 1100, height: 60, left: 0, top: 219, position: 'absolute' }}>
                    <div className="Rectangle" style={{ width: 60, height: 60, left: 1040, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="Rectangle" style={{ width: 1030, height: 60, left: 0, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="BancoBonito" style={{ width: 252, height: 18, left: 10, top: 24, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Banco Bonito</div>
                </div>
                <div className="Linha" style={{ width: 1100, height: 60, left: 0, top: 146, position: 'absolute' }}>
                    <div className="Rectangle" style={{ width: 60, height: 60, left: 1040, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="Rectangle" style={{ width: 1030, height: 60, left: 0, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="FonteGilberto" style={{ width: 252, height: 18, left: 9, top: 24, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Fonte Gilberto </div>
                </div>
                <div className="Linha" style={{ width: 1100, height: 60, left: 0, top: 73, position: 'absolute' }}>
                    <div className="Rectangle" style={{ width: 60, height: 60, left: 1040, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="Rectangle" style={{ width: 1030, height: 60, left: 0, top: 0, position: 'absolute', background: '#F4F4F4', border: '0.50px #3F3F3F solid' }} />
                    <div className="InauguraODaPraA" style={{ width: 253, height: 18, left: 10, top: 24, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Inauguração da Praça</div>
                </div>
                <div className="Noticias" style={{ width: 1100, height: 60, left: 0, top: 0, position: 'absolute' }}>
                    <div className="Rectangle" style={{ width: 1100, height: 60, left: 0, top: 0, position: 'absolute', background: '#F4F4F4', borderTopLeftRadius: 4, borderTopRightRadius: 4, border: '0.50px #3F3F3F solid' }} />
                    <div className="NotCias" style={{ width: 116, height: 31, left: 12, top: 16, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', lineHeight: 18, wordWrap: 'break-word' }}>Notícias</div>
                </div>
            </div>
            <div className="ListaDeNotCias" style={{ width: 275, height: 37, left: 317, top: 224, position: 'absolute', color: 'black', fontSize: 32, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Lista de Notícias</div>
            <div className="AlnMenu">
                <div className="RetanguloMenu" style={{ width: 246, height: 986, left: 0, top: 0, position: 'absolute', background: 'black' }} />
                <div className="IconeSair" style={{ width: 19.66, height: 19.66, left: 24, top: 927, position: 'absolute' }}>
                    <div className="VectorStroke" style={{ width: 6.55, height: 16.38, left: 11.47, top: 1.64, position: 'absolute', background: '#F3F3F3' }}></div>
                    <div className="VectorStroke" style={{ width: 5.73, height: 9.83, left: 7.37, top: 4.91, position: 'absolute', background: '#F3F3F3' }}></div>
                    <div className="VectorStroke" style={{ width: 11.47, height: 1.64, left: 1.64, top: 9.01, position: 'absolute', background: '#F3F3F3' }}></div>
                </div>
                <div className="Sair" style={{ width: 50, left: 52, top: 926, position: 'absolute', color: '#F3F3F3', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Sair</div>
                <div className="AlnLinhaDeSeparaO" style={{ width: 200, height: 0, left: 22, top: 918, position: 'absolute', border: '1px rgba(244, 244, 244, 0.96) solid' }}></div>
                <div className="OpEsMenu" style={{ width: 205.44, height: 208.73, left: 31, top: 381, position: 'absolute' }}>
                    <div className="UsuRios" style={{ width: 85.64, height: 19.66, left: 36.50, top: 0, position: 'absolute', color: '#F3F3F3', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Usuários</div>
                    <div className="PontoTurStico" style={{ width: 168.93, height: 20.37, left: 36.50, top: 36.50, position: 'absolute', color: '#F3F3F3', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Ponto Turístico</div>
                    <div className="Eventos" style={{ width: 146.01, height: 19.66, left: 36.50, top: 73.01, position: 'absolute', color: '#F3F3F3', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Eventos</div>
                    <div className="AtraEs" style={{ width: 146.01, height: 19.66, left: 35.10, top: 109.51, position: 'absolute', color: '#F3F3F3', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Atrações</div>
                    <div className="NotCias" style={{ width: 146.01, left: 35.10, top: 146.01, position: 'absolute', color: '#F3F3F3', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Notícias</div>
                    <div className="Dashboard" style={{ width: 146.01, left: 35.10, top: 186.73, position: 'absolute', color: '#F3F3F3', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Dashboard</div>
                    <div className="IconeDashboard" style={{ width: 15.04, height: 15.45, left: 1.40, top: 190.94, position: 'absolute' }}>
                        <div className="VectorStroke" style={{ width: 2.20, height: 9.83, left: 6.42, top: 5.62, position: 'absolute', background: '#F3F3F3' }}></div>
                        <div className="VectorStroke" style={{ width: 2.20, height: 15.44, left: 12.83, top: 0, position: 'absolute', background: '#F3F3F3' }}></div>
                        <div className="VectorStroke" style={{ width: 2.20, height: 5.62, left: -0, top: 9.83, position: 'absolute', background: '#F3F3F3' }}></div>
                    </div>
                    <div className="IconeUser" style={{ width: 18.25, height: 16.85, left: 0, top: 4.21, position: 'absolute' }}>
                        <div className="VectorStroke" style={{ width: 14.04, height: 7.02, left: 0, top: 9.83, position: 'absolute', background: '#F3F3F3' }}></div>
                        <div className="VectorStroke" style={{ width: 8.42, height: 8.42, left: 2.81, top: 0, position: 'absolute', background: '#F3F3F3' }}></div>
                        <div className="VectorStroke" style={{ width: 4.21, height: 7.02, left: 14.04, top: 9.83, position: 'absolute', background: '#F3F3F3' }}></div>
                        <div className="VectorStroke" style={{ width: 4.21, height: 8.42, left: 11.23, top: 0, position: 'absolute', background: '#F3F3F3' }}></div>
                    </div>
                    <div className="IconePontTuristico" style={{ width: 16.85, height: 16.85, left: 1.40, top: 39.31, position: 'absolute' }}>
                        <div className="Vector" style={{ width: 12.64, height: 16.85, left: 0, top: 0, position: 'absolute', background: '#F3F3F3' }}></div>
                        <div className="Vector" style={{ width: 5.05, height: 6.74, left: 11.79, top: 10.11, position: 'absolute', background: '#F3F3F3' }}></div>
                    </div>
                    <div className="Vector" style={{ width: 7.02, height: 2.81, left: 121, top: 10.64, position: 'absolute', border: '1.40px #F3F3F3 solid' }}></div>
                    <div className="IconeNoticia" style={{ width: 16.85, height: 16.85, left: 1.40, top: 149.17, position: 'absolute' }}>
                        <div className="Vector" style={{ width: 16.85, height: 16.85, left: 0, top: 0, position: 'absolute', background: '#F3F3F3' }}></div>
                        <div className="Vector" style={{ width: 12.61, height: 12.06, left: 1.01, top: 1.96, position: 'absolute', background: '#F3F3F3' }}></div>
                    </div>
                    <div className="IconeAtraO" style={{ width: 12.64, height: 15.44, left: 2.81, top: 112.32, position: 'absolute', background: '#F3F3F3' }}></div>
                    <div className="IconeEventos" style={{ width: 14.04, height: 15.21, left: 2.11, top: 77.22, position: 'absolute', background: '#F3F3F3' }}></div>
                </div>
                <div className="LinhaDeSeparaO" style={{ width: 200, height: 0, left: 22, top: 340, position: 'absolute', border: '1px rgba(244, 244, 244, 0.96) solid' }}></div>
                <div className="NomeEFoto" style={{ width: 157, height: 156, left: 44, top: 144, position: 'absolute' }}>
                    <div className="Group52" style={{ width: 157, height: 156, left: 0, top: 0, position: 'absolute' }}>
                        <div className="RodrigoFaro" style={{ width: 157, height: 29, left: 0, top: 127, position: 'absolute', color: '#F4F4F4', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Rodrigo Faro</div>
                        <div className="Ellipse5" style={{ width: 100, height: 100, left: 28, top: 0, position: 'absolute', border: '2px white solid' }}></div>
                    </div>
                    <img className="Image30" style={{ width: 66, height: 44, left: 76, top: 66, position: 'absolute' }} src="https://via.placeholder.com/66x44" />
                </div>
            </div>
            <img className="AlnLetraComtur" style={{ width: 191, height: 52, left: 1206, top: 34, position: 'absolute' }} src="https://via.placeholder.com/191x52" />
            <div className="AlnBarraDePesquisa" style={{ width: 337, height: 29, left: 673, top: 49, position: 'absolute' }}>
                <div className="Rectangle43" style={{ width: 337, height: 29, left: 0, top: 0, position: 'absolute', background: '#F4F4F4', borderRadius: 12, border: '1px #A1A1A1 solid' }} />
                <div className="Search" style={{ width: 18.84, height: 18, left: 301.42, top: 6, position: 'absolute' }}>
                    <div className="Vector" style={{ width: 12.56, height: 12, left: 2.35, top: 2.25, position: 'absolute', border: '1px black solid' }}></div>
                    <div className="Vector" style={{ width: 3.41, height: 3.26, left: 13.07, top: 12.49, position: 'absolute', border: '1px black solid' }}></div>
                </div>
                <div className="Procurar" style={{ width: 76.40, height: 16, left: 25.96, top: 6, position: 'absolute', color: 'rgba(0, 0, 0, 0.65)', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Procurar...</div>
            </div>
            <div className="AlnAcessibilidade" style={{ width: 206.38, height: 35, left: 319, top: 49, position: 'absolute' }}>
                <div className="IconeDaltonico" style={{ width: 39.83, height: 35, left: 56, top: 0, position: 'absolute' }}>
                    <div className="Rectangle46" style={{ width: 39.83, height: 35, left: 0, top: 0, position: 'absolute', background: '#FDE964', borderRadius: 4.83, border: '1px #757575 solid' }} />
                    <div className="Group4" style={{ width: 24.14, height: 24.14, left: 8, top: 5, position: 'absolute' }}>
                        <div className="Vector" style={{ width: 24.14, height: 24.14, left: 0, top: 0, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Ellipse4" style={{ width: 10.86, height: 21.72, left: 1.21, top: 1.21, position: 'absolute', background: '#333333' }}></div>
                    </div>
                </div>
                <div className="IconeAumentaLetra" style={{ width: 39.83, height: 35, left: 111.03, top: 0, position: 'absolute' }}>
                    <div className="Rectangle47" style={{ width: 39.83, height: 35, left: 0, top: 0, position: 'absolute', background: '#FDE964', borderRadius: 4.83, border: '1px #757575 solid' }} />
                    <div className="A" style={{ width: 27.76, height: 26.55, left: 8.45, top: 4.83, position: 'absolute', color: '#333333', fontSize: 19.31, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>A+</div>
                </div>
                <div className="IconeDiminuiLetra" style={{ width: 39.83, height: 35, left: 166.55, top: 0, position: 'absolute' }}>
                    <div className="Rectangle48" style={{ width: 39.83, height: 35, left: 0, top: 0, position: 'absolute', background: '#FDE964', borderRadius: 4.83, border: '1px #757575 solid' }} />
                    <div className="A" style={{ width: 27.76, height: 26.55, left: 8.45, top: 4.83, position: 'absolute', color: '#333333', fontSize: 19.31, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>A-</div>
                </div>
                <div className="IconeTema" style={{ width: 39.83, height: 35, left: 0, top: 0, position: 'absolute' }}>
                    <div className="Rectangle45" style={{ width: 39.83, height: 35, left: 0, top: 0, position: 'absolute', background: '#FDE964', borderRadius: 4.83, border: '1px #757575 solid' }} />
                    <div className="Group3" style={{ width: 26.55, height: 26.55, left: 7, top: 4, position: 'absolute' }}>
                        <div className="Vector" style={{ width: 12.07, height: 12.07, left: 7.24, top: 7.24, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 0, height: 2.41, left: 13.28, top: 0, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 0, height: 2.41, left: 13.28, top: 24.14, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 1.71, height: 1.71, left: 3.89, top: 3.89, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 1.71, height: 1.71, left: 20.95, top: 20.95, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 2.41, height: 0, left: 0, top: 13.28, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 2.41, height: 0, left: 24.14, top: 13.28, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 1.71, height: 1.71, left: 3.89, top: 20.95, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                        <div className="Vector" style={{ width: 1.71, height: 1.71, left: 20.95, top: 3.89, position: 'absolute', border: '2.41px #333333 solid' }}></div>
                    </div>
                </div>
            </div>
            <div className="BotEsDeListar" style={{ width: 542, height: 59, left: 888, top: 865, position: 'absolute' }}>
                <div className="BotOEditar" style={{ width: 174, height: 59, left: 0, top: 0, position: 'absolute' }}>
                    <div className="Rectangle60" style={{ width: 174, height: 59, left: 0, top: 0, position: 'absolute', background: '#00736A', borderRadius: 6 }} />
                    <div className="Editar" style={{ width: 63, height: 22, left: 66, top: 19, position: 'absolute', color: '#F3F3F3', fontSize: 22, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Editar</div>
                    <div className="Vector" style={{ width: 15.10, height: 14.37, left: 42, top: 23, position: 'absolute', borderRadius: 6, border: '1.33px #F3F3F3 solid' }}></div>
                </div>
                <div className="BotODesativar" style={{ width: 174, height: 59, left: 184, top: 0, position: 'absolute' }}>
                    <div className="Rectangle61" style={{ width: 174, height: 59, left: 0, top: 0, position: 'absolute', background: '#A61337', borderRadius: 6 }} />
                    <div className="Desativar" style={{ width: 101, height: 19, left: 54, top: 19, position: 'absolute', color: '#F3F3F3', fontSize: 22, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Desativar</div>
                    <div className="Vector" style={{ width: 22.44, height: 18.40, left: 19, top: 21, position: 'absolute', background: '#F3F3F3', borderRadius: 6 }}></div>
                </div>
                <div className="BotOPreview" style={{ width: 174, height: 59, left: 368, top: 0, position: 'absolute' }}>
                    <div className="Rectangle62" style={{ width: 174, height: 59, left: 0, top: 0, position: 'absolute', background: '#F7A700', borderRadius: 6 }} />
                    <div className="Visualizar" style={{ width: 106.46, height: 24.91, left: 58.51, top: 15.42, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word' }}>Visualizar</div>
                    <div className="Vector" style={{ width: 25.18, height: 19.67, left: 25.32, top: 19.36, position: 'absolute', background: 'white', borderRadius: 6 }}></div>
                </div>
            </div>
        </div>
    )
}