import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';
import Noticia from "../../screens/noticia";

const Content = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <ContentMain />
    </div>
  )
}

export default Content