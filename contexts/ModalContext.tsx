import { createContext, PropsWithChildren, useContext, useState } from "react";

type ModalContextType = {
    activeModal: boolean
    mostraCadastroProfessor: () => void
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [activeModal, setActiveModal] = useState<boolean>(false)

    function mostraCadastroProfessor() {
        setActiveModal(!activeModal)
    }

    return (
        <ModalContext.Provider value={{ activeModal, mostraCadastroProfessor }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    return useContext(ModalContext)
}