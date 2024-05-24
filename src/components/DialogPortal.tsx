import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEvent, FormEvent } from 'react'
import closeIcon from '../assets/close.svg'

interface DialogPortalProps {
  shouldShowOnboarding: boolean
  title: string
  handleSaveNote(event: FormEvent): void
  asNewNote: true | undefined
  handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>): void
  handleStartEditor(): void
  content: string | undefined
  textareaContent: string
  handleStartRecording(): void
  isRecording: boolean,
  cleanContent(): void
  handleStopRecording(event: FormEvent): void
  onNoteDeleted: ((id: string) => void) | undefined
  noteId: string | undefined
} 

export function DialogPortal({ 
  shouldShowOnboarding, 
  title, 
  handleSaveNote, 
  asNewNote,
  handleContentChanged,
  handleStartEditor,
  content,
  textareaContent,
  handleStartRecording,
  isRecording,
  cleanContent,
  handleStopRecording,
  onNoteDeleted,
  noteId
}: DialogPortalProps) {

  return (
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content
          className='
          bg-slate-700 p-5 pb-16 fixed z-10 inset-0 min-h-52 overflow-hidden outline-none flex flex-col
            md:rounded-md md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-4/5 md:h-[80vh] md:max-w-[640px] md:max-h-[600px]
        '>
          <Dialog.Close title='Fechar' className='p-1 absolute top-0 right-0 bg-slate-800 hover:bg-slate-900 md:rounded-bl-md transition-all outline-none'>
            <img src={closeIcon} alt='' className='size-5' />
          </Dialog.Close>

          <h2 className='text-slate-200 mb-3 font-medium text-sm'>
            {shouldShowOnboarding 
              ? title 
              : (
                <>
                  <button onClick={cleanContent} className='text-xs text-lime-400'>
                    {isRecording ? 'Cancelar' : 'Voltar'}
                  </button>
                </>
              )
            }
          </h2>
          <form className='flex-1 flex flex-col'>
            {asNewNote && 
              <>
                {shouldShowOnboarding
                  ? <p className='text-slate-400 text-sm [&_button]:text-lime-400 [&_button]:font-normal '>
                      Comece <button type='button' onClick={handleStartRecording}>gravando uma nota</button> em áudio ou se preferir <button type='button' onClick={handleStartEditor}>utilize apenas texto</button>.
                    </p> 
                  : (
                    <>
                      <textarea
                        onChange={handleContentChanged}
                        value={textareaContent}
                        disabled={isRecording}
                        autoFocus 
                        placeholder={isRecording ? 'Comece a falar...' : 'Comece a digitar sua nota...'}
                        className='text-sm leading-6 text-slate-400 bg-transparent w-full resize-none flex-1 outline-none'
                      ></textarea>
                    </>
                  )
                }
              </>
            } 

            {!asNewNote && <p>{content}</p>}

            {asNewNote ? (
              <>
                {/* Exibe botão somente se tiver algo digitado ou se estiver gravando */}
                {(textareaContent !== '' || isRecording) && (
                  <>
                    {isRecording ? (
                      <button type='button' 
                        onClick={handleStopRecording} // continuar daqui, ta fechando quando para
                        className='
                          text-stone-900 bg-red-400 outline-none 
                          font-semibold text-sm 
                          absolute left-0 bottom-0 right-0 h-12 
                          transition-all hover:bg-red-500
                      '>
                        Gravando... (clique p/ interromper)
                      </button>
                    ) : (
                      <button  type='submit' 
                        onClick={handleSaveNote}
                        className='
                          text-stone-900 bg-lime-400 outline-none 
                          font-semibold text-sm 
                          absolute left-0 bottom-0 right-0 h-12 
                          transition-all hover:bg-lime-500
                      '>
                        Adicionar nota
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <button type='button' 
                onClick={() => onNoteDeleted && noteId && onNoteDeleted(noteId)}
                className='
                  text-slate-300 bg-slate-800 outline-none 
                  font-medium text-sm 
                  absolute left-0 bottom-0 right-0 h-12 
                  transition-all hover:bg-slate-900
              '>
                Deseja <span className='text-red-400 font-normal'>apagar essa nota</span>?
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
  )
}