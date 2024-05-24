import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { DialogPortal } from './DialogPortal'

interface NewNoteCardProps {
  asNewNote: true
  date?: never
  content?: never
}

interface NoteCardProps {
  date: Date
  content: string
  asNewNote?: never
} 

export function NoteCard({ date, content, asNewNote }: NewNoteCardProps | NoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [textareaContent, setTextareaContent] = useState('')
  const title = asNewNote ? 'Adicionar nota' : formatDistanceToNow(date, { locale: ptBR, addSuffix: true}) 

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }
  
  function handleFinishEditor() {
    setShouldShowOnboarding(true)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextareaContent(event.target.value)
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()
    toast.success('Nota adicionada com sucesso!')
  }

  function onOpenDialog() {
    handleFinishEditor()
    setTextareaContent('')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger onClick={onOpenDialog} className='
        bg-slate-700 rounded-md p-5 overflow-hidden relative ring-2 ring-transparent text-left flex flex-col outline-none
        transition-all hover:ring-slate-600 focus-visible:ring-lime-400
      '>
        <h2 className={`text-sm font-medium mb-3 ${asNewNote ? 'text-slate-200' : 'text-slate-300'}`}>
          {title}
        </h2>
        
        <p className='text-slate-400 text-sm leading-6'>
          {content ?? 'Grave uma nota em áudio que será convertida para texto automaticamente.'}
        </p>

        {!asNewNote && (
          <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent' />
        )}
      </Dialog.Trigger>

      <DialogPortal 
        shouldShowOnboarding={shouldShowOnboarding} 
        title={title} 
        handleFinishEditor={handleFinishEditor}
        handleSaveNote={handleSaveNote}
        asNewNote={asNewNote}
        handleContentChanged={handleContentChanged}
        handleStartEditor={handleStartEditor}
        content={content}
        textareaContent={textareaContent}
      />
    </Dialog.Root>
  )
}