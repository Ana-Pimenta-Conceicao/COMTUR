import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavBarAdm from "../../components/admin/navbarAdm";
import Tabela from "../../components/table/tabela";
import BtnAcao from "../../components/botoes/btnAcao";
import { useNavigate } from "react-router-dom";

const Turismo = () => {
  const baseUrl = "https://localhost:7256/api/Turismmo";
  const baseUrlImagem = "https://localhost:7256/api/ImagemTurismo";
  const baseUrlTipoTurismo = "https://localhost:7256/api/TipoTurismo";

  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);
  const [modalCadastrado, setModalCadastrado] = useState(false);
  const [modalExcluido, setModalExcluido] = useState(false);
  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [modalEditado, setModalEditado] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [turismoNome, setTurismoNome] = useState("");
  const [turismoDescricao, setTurismoDescricao] = useState("");
  const [turismoHorario, setTurismoHorario] = useState("");
  const [turismoQrCode, setTurismoQrCode] = useState("");
  const [turismoLocal, setTurismoLocal] = useState("");
  const [turismoDias, setTurismoDias] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [turismoImagens, setTurismoImagens] = useState([]);
  const [turismoLegendaImagens, setTurismoLegendaImagens] = useState([]);
  const [turismoIdTipo, setTurismoIdTipo] = useState("");
  const [turismoTipoSelecionado, setTurismoTipoSelecionado] = useState(null);
  const [turismoTipoOpcao, setTurismoTipoOpcao] = useState([]);
  const [turismoId, setTurismoId] = useState("");

  const navigate = useNavigate();

  const limparDados = () => {
    setTurismoNome("");
    setTurismoDescricao("");
    setTurismoHorario("");
    setTurismoQrCode("");
    setTurismoLocal("");
    setTurismoDias("");
    setTurismoImagens("");
    setTurismoLegendaImagens("");
    setTurismoId("");
  };

  const TurismoSet = (turismo, opcao) => {
    console.log("turismo que foi passado: ", turismo);
    setTurismoId(turismo.id);
    setTurismoNome(turismo.nome);
    setTurismoDescricao(turismo.descricao);
    setTurismoHorario(turismo.horario);
    setTurismoQrCode(turismo.qrCode);
    setTurismoLocal(turismo.local);
    setTurismoDias(turismo.diaFuncionamento);

    setTurismoImagens(turismo.imagemTurismo);

    if (opcao === "Editar") {
      abrirFecharModalEditar(/*noticia.id*/);
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/visualizarTurismo/${turismo.id}`);
    }
  };

  //   const VisualizarTodasNoticias = () => {
  //     navigate(`/todosturismos`);
  //   };

  const abrirFecharModalInserir = () => {
    modalInserir ? limparDados() : null;
    setModalInserir(!modalInserir);
  };

  const abrirModalCadastrado = () => {
    setModalCadastrado(true);
  };

  const fecharModalCadastrado = () => {
    setModalCadastrado(false);
  };

  const abrirModalExcluido = () => {
    setModalExcluido(true);
  };

  const fecharModaExcluido = () => {
    setModalExcluido(false);
  };

  const abrirModalEditado = () => {
    setModalEditado(true);
  };

  const fecharModaEditado = () => {
    setModalEditado(false);
  };

  const abrirFecharModalEditar = async (id) => {
    modalEditar ? limparDados() : null;
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalDeletar = () => {
    modalDeletar ? limparDados() : null;
    setModalDeletar(!modalDeletar);
  };

  const pedidoGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function convertImageToBase64(imageFile, callback) {
    if (!imageFile) {
      callback(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      callback(base64String);
    };

    reader.onerror = () => {
      callback(false);
    };

    reader.readAsDataURL(imageFile);
  }

  const pedidoGetTipoTurismo = async () => {
    await axios
      .get(baseUrlTipoTurismo)
      .then((response) => {
        setDataTurismo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPost = async () => {
    const formData = new FormData();
    formData.append("nome", turismoNome);
    formData.append("descricao", turismoDescricao);
    formData.append("horario", turismoHorario);
    formData.append("imagem", turismoImagem);
    formData.append("qrCode", turismoQrCode);
    formData.append("local", turismoLocal);
    formData.append("diaFuncionamento", turismoDias);
    formData.append("idTipoTurismo", turismoTipoSelecionado);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(data.concat(response.data));
      await pedidoPostImagens(response.data.id);
      abrirFecharModalInserir();
      limparDados();
      setAtualizarData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoPostImagens = async (turismoId) => {
    const formData = new FormData();
    imagensNoticia.forEach((imagem) => {
      formData.append("imagens", imagem.imagem);
      formData.append("legendas", imagem.legendaImagem);
    });

    try {
      const response = await axios.post(
        baseUrlImagem + `/${idTurismo}/CadastrarImagensTurismo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  async function pedidoAtualizar() {
    const formData = new FormData();
    formData.append("nome", turismoNome);
    formData.append("descricao", turismoDescricao);
    formData.append("horario", turismoHorario);
    formData.append("imagem", turismoImagem);
    formData.append("qrCode", turismoQrCode);
    formData.append("local", turismoLocal);
    formData.append("diaFuncionamento", turismoDias);
    formData.append("idTipoTurismo", turismoTipoSelecionado);

    try {
        const response = await axios.put(`${baseUrl}/${turismoId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const atualizaTurismo = response.data;
  
        setData((prevData) => {
          return prevData.map((turismo) => {
            if (turismo.id === turismoId) {
              return atualizaTurismo;
            }
            return turismo;
          });
        });
  
        abrirFecharModalEditar();
        await pedidoPutImagens();
        limparDados();
        setAtualizarData(true);
        abrirModalEditado();
      } catch (error) {
        console.log(error);
      }
  }

  const pedidoPutImagens = async () => {
    const formData = new FormData();
    imagemTurismo.forEach((imagem) => {
      formData.append("imagens", imagem.imagem);
      formData.append("legendas", imagem.legendaImagem);
    });

    try {
      const response = await axios.put(
        baseUrlImagem + `/${turismoId}/AtualizarImagensTurismo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const removeImagemByIndex = (indexToRemove) => {
    setTurismoImagens((prevImagens) =>
      prevImagens.filter((_, index) => index !== indexToRemove)
    );
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + turismoId)
      .then((response) => {
        const novoTurismo = data.filter(
          (turismo) => turismo.id !== response.data
        );
        setData(novoTurismo);
        abrirFecharModalDeletar();
        limparDados();
        setAtualizarData(true);
        abrirModalExcluido();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

// Função para pegar uma parte específica da lista
const getCurrentPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Renderiza os itens da página atual
  const currentItems = getCurrentPageItems(currentPage);

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);



  // turismoid
  // nome
  // descricao
  // horario
  // qrcode
  // local
  // diafuncionamento
  // usuarioid
  // idtipoturismo
  // imagemturismo

//   ligar atração com usuario
// ligar empresa com tipoturismo 
// na homeusr, aparecer o tipoturismo
// add imagem no tipoturismo 

  noticia;

  return <div>turismo</div>;
};

export default Turismo;
