import { Root as DialogRoot } from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './Button'
import { Card } from './Card'
import { Modal } from './Modal'

export interface NoteProps {
	id: string
	date: Date
	content: string
	notes: Pick<NoteProps, 'id' | 'date' | 'content'>[]
	setNotes: React.Dispatch<React.SetStateAction<Pick<NoteProps, 'id' | 'date' | 'content'>[]>>
}

export function Note({ id, date, content, notes, setNotes }: NoteProps) {
	const [open, setOpen] = useState(false)
	const dateFormated = formatDistanceToNow(date, { locale: ptBR, addSuffix: true })

	function deleteNote() {
		const notesArray = notes.filter(note => note.id !== id)
		setOpen(false)
		localStorage.setItem('notes', JSON.stringify(notesArray))
		toast.success('Nota deletada com sucesso!')
		// Necessário para aguardar a animação do modal antes da renderização
		setTimeout(() => setNotes(notesArray), 800)
	}

	return (
		<DialogRoot open={open} onOpenChange={setOpen}>
			<Card title={dateFormated} description={content} theme='dark' />
			<Modal>
				<h2 className='text-slate-200 mb-3 font-medium text-sm'>{dateFormated}</h2>
				<p>{content}</p>
				<form className='flex-1 flex flex-col'>
					<Button onClick={deleteNote}>
						Deseja<span className='text-red-400 ml-1'>apagar essa nota</span>?
					</Button>
				</form>
			</Modal>
		</DialogRoot>
	)
}
