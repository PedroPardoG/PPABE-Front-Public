import '../App.css'
import logoLeonCompletoNLBlanco from '../assets/logo_leon_completo_nl_blanco.svg';
import logoCircular from '../assets/logo_circular.svg';

const Footer = () => {
  return (
    <div>
    <div className="bottom-section">
        <div className="bottom-links">
        <a href="#">Gobierno</a>
        <a href="#">Trámites y servicios</a>
        <a href="#">Transparencia</a>
        <a href="#">Código de ética</a>
        <a href="#">Decálogo de principios</a>
        </div>
        <div className="bottom-logo">
        <img src={logoCircular} alt="Logo Nuevo León" />
        </div>
    </div>

    <footer className="footer">
      <div className="footer-logo">
        <img src={logoLeonCompletoNLBlanco}
          alt="Gobierno de Nuevo León" />
      </div>

      <div className="footer-content">
        <div className="footer-links">
          <a href="#">Sobre el tratamiento de datos personales</a>
          <span>|</span>
          <a href="#">Danos tu opinión</a>
        </div>

        <div className="footer-social">
          <span>Mantente informado:</span>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
