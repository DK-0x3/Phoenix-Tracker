import './Modal.scss';
import { createPortal } from 'react-dom';
import { useModal } from './ModalContext';
import { FC, useEffect, useRef, useState } from 'react';

export const Modal: FC = () => {
	const { isOpen, closeModal, component } = useModal();
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setIsTransitioning(true);
		} else {
			setIsTransitioning(false);
		}
	}, [isOpen]);

	const handleCloseModal = () => {
		setIsTransitioning(false);
		setTimeout(() => {
			closeModal();
		}, 300);
	};

	if (!isOpen && !isTransitioning) return null;

	return createPortal(
		<div
			className={`modal-overlay ${isTransitioning ? 'open' : ''}`}
			onClick={handleCloseModal}
		>
			<div
				className={`modal-content ${isTransitioning ? 'open' : ''}`}
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}
			>
				<button className="modal-close" onClick={handleCloseModal}>
					×
				</button>
				<div>{component}</div>
			</div>
		</div>,
		document.body
	);
};