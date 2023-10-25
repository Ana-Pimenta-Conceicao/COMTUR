import { Link } from 'react-router-dom';


export default function Home(){

  return (
    <div>
      <h1>Página Inicial</h1>
      <nav>
        <ul>
          <li>
            <Link to="/noticia">Noticia</Link>
          </li>
          <li>
            <Link to="/tipoturismo">Tipo Turismo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}