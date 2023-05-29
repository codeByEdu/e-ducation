import { createContext, PropsWithChildren, useContext, useState } from "react";

type ModalContextType = {
    activeModal: boolean
    mostraCadastroProfessor: () => void
    mostraCadastroTurma: () => void
    mostraCadastroAluno: () => void
    mostraSelectHorario: () => void
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [activeModal, setActiveModal] = useState<boolean>(false)

    function mostraCadastroProfessor() {
        setActiveModal(!activeModal)
    }
    function mostraCadastroTurma() {
        setActiveModal(!activeModal)
    }
    function mostraCadastroAluno() {
        setActiveModal(!activeModal)
    }
    function mostraSelectHorario() {
        setActiveModal(!activeModal)
    }

    return (
        <ModalContext.Provider value={{ activeModal, mostraCadastroProfessor, mostraCadastroTurma, mostraCadastroAluno, mostraSelectHorario }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    return useContext(ModalContext)
}