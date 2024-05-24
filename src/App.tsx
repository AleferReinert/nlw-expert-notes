import { useState } from 'react';
import { toast } from 'sonner';
import logo from "./assets/logo-nlw-expert.svg";
import { NoteCard, NoteCardProps } from './components/NoteCard';

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Pick<NoteCardProps, 'id' | 'date' | 'content'>[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    return notesOnStorage ? JSON.parse(notesOnStorage) : []
  })

  function onNoteAdded(content: string) {
    const newNote = {id: crypto.randomUUID(), date: new Date(), content}
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  // Filtra as notas que não possuem o id do objeto a ser deletado
  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id
    })

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
    toast.success('Nota deletada com sucesso!')
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  // Se a busca não estiver vazia, filtra as notas que contém o texto da busca
  const filteredNotes = search !== ''
    ? notes.filter(notes => notes.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className="mx-auto my-10 max-w-[1132px] flex flex-col gap-6 px-5">
      <img src={logo} alt="NLW Expert" className='w-min h-6' />
      <form className="w-full">
        <input 
          type="search" 
          onChange={handleSearch}
          value={search}
          placeholder="Busque em suas notas..."
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none'
       />
      </form>
      <hr className='border-slate-500' />
      <div className='grid sm:grid-cols-2 md:grid-cols-3 auto-rows-[250px] gap-6'>
        <NoteCard asNewNote onNoteAdded={onNoteAdded} />

        {filteredNotes.map(note => (
          <NoteCard 
            key={note.id}
            id={note.id}
            date={note.date}
            content={note.content}
            onNoteDeleted={onNoteDeleted}
          />
        ))}
      </div>
    </div>
  );
}
