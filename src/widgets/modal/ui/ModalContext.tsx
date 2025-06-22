import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IModalContextType {
	isOpen: boolean;
	openModal: (component: ReactNode) => void;
	closeModal: () => void;
	component: ReactNode | null;
}

const ModalContext = createContext<IModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [component, setComponent] = useState<ReactNode | null>(null);

	const openModal = (component: ReactNode) => {
		setComponent(component);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setComponent(null);
	};

	return (
		<ModalContext.Provider value={{ isOpen, openModal, closeModal, component }}>
			{children}
		</ModalContext.Provider>
	);
};

/**
 * Хук для доступа к контексту модалки
 */
export const useModal = (): IModalContextType => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};
