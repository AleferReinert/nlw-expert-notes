import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { DialogPortal } from './DialogPortal'

interface NewNoteCardProps {
  asNewNote: true
  onNoteAdded: (content: string) => void
  id?: never
  date?: never
  content?: never
  onNoteDeleted?: never
}

export interface NoteCardProps {
  id: string
  date: Date
  content: string
  onNoteDeleted(id: string): void
  asNewNote?: never
  onNoteAdded?: never
} 

let speechRecognition: SpeechRecognition | null = null

export function NoteCard({ id, date, content, asNewNote, onNoteAdded, onNoteDeleted }: NewNoteCardProps | NoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [textareaContent, setTextareaContent] = useState('')
  const title = asNewNote ? 'Adicionar nota' : formatDistanceToNow(date, { locale: ptBR, addSuffix: true}) 
  const [isRecording, setIsRecording] = useState(false)

  const handleStartEditor = () => {
    setShouldShowOnboarding(false)
    setIsRecording(false)
  }

  function handleStopEditor() {
    setShouldShowOnboarding(true)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextareaContent(event.target.value)
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()
    onNoteAdded && onNoteAdded(textareaContent)
    toast.success('Nota adicionada com sucesso!')
    cleanContent()
  }

  function cleanContent() {
    handleStopEditor()
    setTextareaContent('')
    setIsRecording(false)
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    if(!isSpeechRecognitionAPIAvailable) {
      toast.error(
        'Seu navegador não tem suporte para gravação de áudio. Tente atualizar ou usar outro navegador.', 
        {position: 'bottom-center', duration: 8000}
      )
      return
    }
    setIsRecording(true)
    setShouldShowOnboarding(false)
    const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    speechRecognition = new speechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1 // quando não entende uma palavra, retorna apenas uma (a mais parecida)
    speechRecognition.interimResults = true // retorna resultados enquanto fala

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      setTextareaContent(transcription)
    }
    speechRecognition.onerror = (event) => {
      console.error(event)
    }
    speechRecognition.start()
  }

  function handleStopRecording(event: FormEvent) {
    event.preventDefault()
    setIsRecording(false)
    if(speechRecognition !== null) {
      speechRecognition.stop()
    }

    if(textareaContent === ''){
      setShouldShowOnboarding(true)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger onClick={cleanContent} className='
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
        handleSaveNote={handleSaveNote}
        asNewNote={asNewNote}
        handleContentChanged={handleContentChanged}
        handleStartEditor={handleStartEditor}
        content={content}
        textareaContent={textareaContent}
        handleStartRecording={handleStartRecording}
        isRecording={isRecording}
        cleanContent={cleanContent}
        handleStopRecording={handleStopRecording}
        onNoteDeleted={onNoteDeleted}
        noteId={id}
      />
    </Dialog.Root>
  )
}