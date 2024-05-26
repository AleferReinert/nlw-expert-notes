import { useState } from 'react'
import { toast } from 'sonner'
import logo from './assets/logo-nlw-expert.svg'
import { NewNote } from './components/NewNote'
import { Note, NoteProps } from './components/Note'
import { Search } from './components/Search'

export function App() {
	const [search, setSearch] = useState('')
	const [notes, setNotes] = useState<Pick<NoteProps, 'id' | 'date' | 'content'>[]>(() => {
		const notesOnStorage = localStorage.getItem('notes')
		return notesOnStorage ? JSON.parse(notesOnStorage) : []
	})

	function createNote(content: string) {
		const newNote = { id: crypto.randomUUID(), date: new Date(), content }
		const notesArray = [newNote, ...notes]
		setNotes(notesArray)
		localStorage.setItem('notes', JSON.stringify(notesArray))
	}

	function deleteNote(id: string) {
		const notesArray = notes.filter(note => note.id !== id)
		setNotes(notesArray)
		localStorage.setItem('notes', JSON.stringify(notesArray))
		toast.success('Nota deletada com sucesso!')
	}

	const filteredNotes = search
		? notes.filter(notes => notes.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
		: notes

	return (
		<div className='mx-auto my-10 max-w-[1132px] px-5'>
			<img src={logo} alt='NLW Expert' className='w-min h-6 mb-6' />
			<Search search={search} setSearch={setSearch} />

			<div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
				{!search && <NewNote createNote={createNote} />}

				{filteredNotes.map(note => (
					<Note key={note.id} id={note.id} date={note.date} content={note.content} deleteNote={deleteNote} />
				))}
				{search && filteredNotes.length === 0 && <p>Nenhuma nota encontrada.</p>}
			</div>
		</div>
	)
}
