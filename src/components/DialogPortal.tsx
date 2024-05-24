import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEvent, FormEvent } from 'react'
import closeIcon from '../assets/close.svg'

interface DialogPortalProps {
  shouldShowOnboarding: boolean
  title: string
  handleFinishEditor(): void
  handleSaveNote(event: FormEvent): void
  asNewNote: true | undefined
  handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>): void
  handleStartEditor(): void
  content: string | undefined
  textareaContent: string
} 

export function DialogPortal({ 
  shouldShowOnboarding, 
  title, 
  handleFinishEditor, 
  handleSaveNote, 
  asNewNote,
  handleContentChanged,
  handleStartEditor,
  content,
  textareaContent
}: DialogPortalProps) {

  return (
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content
          className='
            fixed z-10 bg-slate-700 p-5 pb-16 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-4/5 h-[80vh] min-h-52 max-w-[640px] max-h-[600px] overflow-hidden outline-none flex flex-col
        '>
          <Dialog.Close title='Fechar' className='p-1 absolute top-0 right-0 bg-slate-800 hover:bg-slate-900 rounded-bl-md transition-all outline-none'>
            <img src={closeIcon} alt='' className='size-5' />
          </Dialog.Close>

          <h2 className='text-slate-200 mb-3 font-medium text-sm'>
            {shouldShowOnboarding 
              ? title 
              : (
                <button onClick={handleFinishEditor} className='text-xs text-lime-400'>
                  Voltar
                </button>
              )
            }
          </h2>
          <form onSubmit={(event) => handleSaveNote(event)} className='flex-1 flex flex-col'>
            {asNewNote && 
              <>
                {shouldShowOnboarding 
                  ? <p className='text-slate-400 text-sm [&_button]:text-lime-400 [&_button]:font-normal '>
                      Comece <button>gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor}>utilize apenas texto</button>.
                    </p> 
                  : <textarea onChange={handleContentChanged} autoFocus 
                      placeholder='Comece a digitar sua nota...'
                      className='text-sm leading-6 text-slate-400 bg-transparent w-full resize-none flex-1 outline-none'
                    ></textarea>
                }
              </>
            } 

            {!asNewNote && <p>{content}</p>}

            {asNewNote ? (
              <>
                {!shouldShowOnboarding && textareaContent !== '' && (
                    <button  type='submit' 
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
            ) : (
              <button type='button' 
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