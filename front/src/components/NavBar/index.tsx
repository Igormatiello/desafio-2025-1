import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/img/2.png";
import AuthService from "@/service/AuthService";
import OrderService from "@/service/OrderService";
import { useEffect, useState } from "react";

export function NavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [uniqueProductCount, setUniqueProductCount] = useState<number>(0);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  useEffect(() => {

    const updateUniqueProductCount = () => {
      const cart = OrderService.getCart();
      const uniqueProducts = new Set(cart.map(item => item.product.id));
      setUniqueProductCount(uniqueProducts.size);
    };

    updateUniqueProductCount();
  }, []);

  const onClickLogout = () => {
    AuthService.logout();
    OrderService.clearCart(); // Limpa o carrinho ao deslogar
    navigate("/login");
  };

  return (
    <div className="bg-lightblue shadow-sm mb-2" style={{ backgroundColor: "#add8e6" }}> { }
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="160" alt="UTFPR" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                to="/products"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Produtos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="bi bi-cart"></i> Carrinho
                {uniqueProductCount > 0 && (
                  <span className="badge bg-secondary rounded-pill">{uniqueProductCount}</span>
                )}
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/address"
                    className={(navData) =>
                      navData.isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Endereço
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/orders"
                    className={(navData) =>
                      navData.isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Meus Pedidos
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {!isAuthenticated && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">Olá visitante, faça seu </span>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  <u>Login</u>
                </NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link">ou</span>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  <u>Cadastra-se</u>
                </NavLink>
              </li>
            </ul>
          )}

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
