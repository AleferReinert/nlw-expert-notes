import { Root as DialogRoot } from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Button } from './Button'
import { Card } from './Card'
import { Modal } from './Modal'

export interface NoteProps {
	id: string
	date: Date
	content: string
	deleteNote(id: string): void
}

export function Note({ id, date, content, deleteNote }: NoteProps) {
	const dateFormated = formatDistanceToNow(date, { locale: ptBR, addSuffix: true })

	return (
		<DialogRoot>
			<Card title={dateFormated} description={content} />
			<Modal>
				<h2 className='text-slate-200 mb-3 font-medium text-sm'>{dateFormated}</h2>
				<form className='flex-1 flex flex-col'>
					<p>{content}</p>

					<Button type='submit' onClick={() => deleteNote(id)}>
						Deseja<span className='text-red-400 ml-1'>apagar essa nota</span>?
					</Button>
				</form>
			</Modal>
		</DialogRoot>
	)
}
