import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import closeIcon from '../assets/close.svg'

interface ModalProps {
	children: ReactNode
}

export function Modal({ children }: ModalProps) {
	return (
		<Dialog.Portal>
			<Dialog.Overlay className='fixed inset-0 bg-black/50' />
			<Dialog.Content
				className='
                bg-slate-700 p-5 pb-16 fixed z-10 inset-0 min-h-52 overflow-hidden outline-none flex flex-col
                    md:rounded-md md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-4/5 md:h-[80vh] md:max-w-[640px] md:max-h-[600px]
                '
			>
				<Dialog.Close
					title='Fechar'
					className='p-1 absolute top-0 right-0 bg-slate-800 hover:bg-slate-900 md:rounded-bl-md transition-all outline-none'
				>
					<img src={closeIcon} alt='' className='size-5' />
				</Dialog.Close>

				{children}
			</Dialog.Content>
		</Dialog.Portal>
	)
}
