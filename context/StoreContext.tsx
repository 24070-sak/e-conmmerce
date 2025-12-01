import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';

// --- Custom Router Implementation to replace react-router-dom ---
interface RouterContextType {
  path: string;
}

const RouterContext = createContext<RouterContextType>({ path: '/' });
const RouteContext = createContext<Record<string, string>>({});

export const HashRouter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <RouterContext.Provider value={{ path }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => {
  const { path: fullPath } = useContext(RouterContext);
  const splitIndex = fullPath.indexOf('?');
  let pathname = fullPath;
  let search = '';
  if (splitIndex !== -1) {
    pathname = fullPath.slice(0, splitIndex);
    search = fullPath.slice(splitIndex);
  }
  return { pathname, search, hash: '' };
};

export const useParams = <T extends Record<string, string>>(): T => {
  return useContext(RouteContext) as T;
};

export const Link: React.FC<{ to: string; className?: string; children: ReactNode; onClick?: (e: React.MouseEvent) => void }> = ({ to, className, children, onClick }) => {
  return (
    <a 
      href={`#${to}`} 
      className={className} 
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  );
};

export const Navigate: React.FC<{ to: string; replace?: boolean }> = ({ to }) => {
    useEffect(() => {
        window.location.hash = to;
    }, [to]);
    return null;
}

interface RouteProps {
    path: string;
    element: ReactNode;
}

export const Route: React.FC<RouteProps> = ({ element }) => {
    return <>{element}</>;
};

export const Routes: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { pathname } = useLocation();
    
    let elementToRender: ReactNode = null;
    let params: Record<string, string> = {};

    React.Children.forEach(children, (child) => {
        if (elementToRender) return;
        if (!React.isValidElement(child)) return;
        
        const props = child.props as RouteProps;
        const routePath = props.path;
        
        if (routePath === '*') {
             elementToRender = props.element;
             return;
        }

        // Simple param matching: /product/:id -> ^/product/([^/]+)$
        const regexStr = '^' + routePath.replace(/:([^\/]+)/g, '([^/]+)') + '$';
        const regex = new RegExp(regexStr);
        const match = pathname.match(regex);

        if (match) {
            elementToRender = props.element;
            const paramNames = (routePath.match(/:([^\/]+)/g) || []).map(s => s.slice(1));
            paramNames.forEach((name, index) => {
                params[name] = match[index + 1];
            });
        }
    });

    return (
        <RouteContext.Provider value={params}>
            {elementToRender}
        </RouteContext.Provider>
    );
};
// --- End Custom Router Implementation ---

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};