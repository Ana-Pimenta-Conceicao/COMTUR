import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import BtnModais from "../../components/botoes/btnModais.jsx";

const ModalParametros = ({ isOpen, toggle, onSubmit, parametro }) => {
  const [formData, setFormData] = useState({
    id: 0,
    definicaoTurismo: "",
    beneficios: "",
    dataFundacao: "",
    areaTerritorial: "",
    distanciaCapital: "",
    habitantes: 0,
    descricaoEntreRios: "",
    imagemEntreRios: "",
    descricaoIT: "",
    imagemIT: "",
  });

  const [previewImageEntreRios, setPreviewImageEntreRios] = useState(null);
  const [previewImageIT, setPreviewImageIT] = useState(null);

  useEffect(() => {
    if (parametro) {
      setFormData(parametro);
      setPreviewImageEntreRios(parametro.imagemEntreRios);
      setPreviewImageIT(parametro.imagemIT);
    } else {
      setFormData({
        id: 0,
        definicaoTurismo: "",
        beneficios: "",
        dataFundacao: "",
        areaTerritorial: "",
        distanciaCapital: "",
        habitantes: 0,
        descricaoEntreRios: "",
        imagemEntreRios: "",
        descricaoIT: "",
        imagemIT: "",
      });
      setPreviewImageEntreRios(null);
      setPreviewImageIT(null);
    }
  }, [parametro, isOpen]);

  const formatarDataParaExibicao = (data) => {
    if (!data) return "";
    const partes = data.split("-");
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    return data;
  };

  const formatarEntradaData = (value) => {
    const apenasNumeros = value.replace(/\D/g, "");
    let formatoData = "";
    if (apenasNumeros.length > 0) formatoData += apenasNumeros.substring(0, 2);
    if (apenasNumeros.length >= 3) formatoData += "/" + apenasNumeros.substring(2, 4);
    if (apenasNumeros.length >= 5) formatoData += "/" + apenasNumeros.substring(4, 8);
    return formatoData;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Adicionando log para depuração
    console.log(`Mudando ${name} para ${value}`);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "dataFundacao") {
      const dataFormatada = formatarEntradaData(value);
      setFormData((prevData) => ({ ...prevData, [name]: dataFormatada }));

      if (dataFormatada.length === 10) {
        const [dia, mes, ano] = dataFormatada.split("/");
        const dataFinal = `${ano}-${mes}-${dia}`;
        setFormData((prevData) => ({ ...prevData, [name]: dataFinal }));
      }
    }
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [key]: reader.result }));
        if (key === "imagemEntreRios") {
          setPreviewImageEntreRios(reader.result);
        } else if (key === "imagemIT") {
          setPreviewImageIT(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData); // Log do estado antes do envio
    onSubmit(formData);
    toggle();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{parametro ? "Editar Parâmetros" : "Adicionar Parâmetros"}</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Definição de Turismo:</label>
          <textarea
            name="definicaoTurismo"
            className="form-control"
            value={formData.definicaoTurismo}
            onChange={handleChange}
            rows={3}
          />
          <br/>
          <label>Benefícios:</label>
          <textarea
            name="beneficios"
            className="form-control"
            value={formData.beneficios}
            onChange={handleChange}
            rows={3}
          />
          <br/>
          <label htmlFor="dataFundacao">Data da Fundação:</label>
          <input
            type="text"
            name="dataFundacao"
            className="form-control"
            placeholder="dd/mm/yyyy"
            onChange={handleChange}
            value={formatarDataParaExibicao(formData.dataFundacao)}
            maxLength={10}
          />
          <br/>
          <label>Área Territorial:</label>
          <input
            type="text"
            name="areaTerritorial"
            className="form-control"
            value={formData.areaTerritorial}
            onChange={handleChange}
          />
          <br/>
          <label>Distância da Capital:</label>
          <textarea
            name="distanciaCapital"
            className="form-control"
            value={formData.distanciaCapital}
            onChange={handleChange}
          />
          <br/>
          <label>Habitantes:</label>
          <input
            type="number"
            name="habitantes"
            className="form-control"
            value={formData.habitantes}
            onChange={handleChange}
          />
          <br/>
          <label>Descrição Entre Rios:</label>
          <textarea
            name="descricaoEntreRios"
            className="form-control"
            value={formData.descricaoEntreRios}
            onChange={handleChange}
            rows={3}
          />
          <br/>
          <label>Imagem Entre Rios:</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleImageChange(e, 'imagemEntreRios')}
          />
          {previewImageEntreRios && <img src={previewImageEntreRios} alt="Preview Entre Rios" style={{ width: '100%', marginTop: '10px' }} />}
          <br/>
          <label>Descrição IT:</label>
          <textarea
            name="descricaoIT"
            className="form-control"
            value={formData.descricaoIT}
            onChange={handleChange}
            rows={3}
          />
          <br/>
          <label>Imagem IT:</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleImageChange(e, 'imagemIT')}
          />
          {previewImageIT && <img src={previewImageIT} alt="Preview IT" style={{ width: '100%', marginTop: '10px' }} />}
        </div>
      </ModalBody>

      <ModalFooter>
        <BtnModais funcao={handleSubmit} acao={"Editar"} />
        <BtnModais funcao={toggle} acao="Cancelar" />
      </ModalFooter>
    </Modal>
  );
};

export default ModalParametros;
