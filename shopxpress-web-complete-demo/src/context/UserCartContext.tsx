import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import useCart from "../pages/Cart/hooks/useCart";
import { useAuth } from "./AuthContext";

interface UserCartContextProps {
    itemInCart: number;
    setItemInCart: (items: number) => void
}

const UserCartContext = createContext<UserCartContextProps | undefined>(undefined);

export const UserCartProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [itemInCart, setItemInCart] = useState<number>(0);
    const { userCart, getUserCart } = useCart(false);

    useEffect(() => {
        if (isAuthenticated) {
            setItemInCart(userCart?.cartProducts?.length ?? 0);
        }
    }, [userCart, isAuthenticated])

    useEffect(() => {
        const fetchUserCart = async () => {
            await getUserCart();
        }
        if (isAuthenticated) {
            fetchUserCart();
        }

    }, [getUserCart, isAuthenticated])

    return (
        <UserCartContext.Provider value={{ itemInCart, setItemInCart }}>
            {children}
        </UserCartContext.Provider>
    )
}

export const useUserCartContext = () => {
    const context = useContext(UserCartContext);
    if (!context) {
        throw new Error('useUserCartContext must be used within an UserCartProvider');
    }
    return context;
};
