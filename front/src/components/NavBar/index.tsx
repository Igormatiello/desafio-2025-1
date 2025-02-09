import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/img/logo.png";
import AuthService from "@/service/AuthService";
import { useEffect, useState } from "react";

export function NavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
      const tipo = localStorage.getItem("tipo");
      console.log(tipo)
      setUserType(tipo);
    };
    checkAuth();
  }, []);

  const onClickLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="bg-lightblue shadow-sm mb-2" style={{ backgroundColor: "#add8e6" }}>
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="160" alt="UTFPR" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {userType === "P" && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/cursos_livres"
                    className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
                  >
                    Cursos Disponíveis
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/meus_cursos_professor"
                    className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
                  >
                    Meus Cursos
                  </NavLink>
                </li>
              </>
            )}
            {userType === "E" && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/meus_cursos_estudante"
                    className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
                  >
                     Cursos
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink
                to="/meus_dados"
                className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
              >
                Meus dados
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/endereco"
                className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
              >
                Endereço
              </NavLink>
            </li>
          </ul>
          {isAuthenticated && (
            <NavLink to="/login" className="nav-link" onClick={onClickLogout}>
              Sair
            </NavLink>
          )}
        </nav>
      </div>
    </div>
  );
}
