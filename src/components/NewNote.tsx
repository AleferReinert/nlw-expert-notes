import { Root as DialogRoot } from '@radix-ui/react-dialog'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Button } from './Button'
import { Card } from './Card'
import { Modal } from './Modal'

interface NewNoteProps {
	createNote: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNote({ createNote }: NewNoteProps) {
	const [content, setContent] = useState('')
	const [isRecording, setIsRecording] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const isInteracting = isRecording || isTyping

	function cleanContent() {
		setContent('')
		setIsTyping(false)
		setIsRecording(false)
	}

	const startTyping = () => {
		setIsTyping(true)
		setIsRecording(false)
	}

	function startRecording() {
		setContent('')
		const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
		if (!isSpeechRecognitionAPIAvailable) {
			toast.error('Seu navegador não suporta gravação de áudio. \nAtualize ou use outro navegador.', {
				position: 'bottom-center',
				duration: 5500
			})
			return
		}
		setIsRecording(true)
		setIsTyping(true)
		const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
		speechRecognition = new speechRecognitionAPI()
		speechRecognition.continuous = true
		speechRecognition.interimResults = true // Retorna o resultado enquanto fala.

		speechRecognition.onresult = event => {
			const transcription = Array.from(event.results).reduce(
				(text, result) => text.concat(result[0].transcript),
				''
			)
			setContent(transcription)
		}
		speechRecognition.onerror = event => console.error(event.error)
		speechRecognition.start()
	}

	function stopRecording(event: FormEvent) {
		event.preventDefault()
		setIsRecording(false)
		speechRecognition?.stop()

		if (!content) {
			setIsTyping(false)
			toast.error('Gravação cancelada!', { duration: 2000 })
		}
	}

	function saveNote(event: FormEvent) {
		event.preventDefault()
		createNote(content)
		cleanContent()
		toast.success('Nota adicionada com sucesso!')
	}

	return (
		<DialogRoot onOpenChange={cleanContent}>
			<Card
				title='Adicionar nota'
				description='Grave uma nota em áudio que será convertida para texto automaticamente.'
			/>
			<Modal>
				<h2 className='text-slate-200 mb-3 font-medium text-sm'>
					{isInteracting ? (
						<button onClick={cleanContent} className='text-xs text-red-400'>
							{isRecording ? 'Cancelar' : 'Voltar'}
						</button>
					) : (
						'Adicionar nota'
					)}
				</h2>
				<form className='flex-1 flex flex-col'>
					{isInteracting ? (
						<textarea
							onChange={event => setContent(event.target.value)}
							value={content}
							disabled={isRecording}
							autoFocus
							placeholder={
								isRecording ? 'Estou ouvindo! \nSua fala aparecerá aqui...' : 'Digite sua nota...'
							}
							className='focus:bg-red-100 text-sm leading-6 text-slate-400 bg-transparent w-full resize-none flex-1 outline-none'
						></textarea>
					) : (
						<p className='text-slate-400 text-sm [&_button]:text-lime-400 [&_button]:font-normal '>
							Comece{' '}
							<button type='button' onClick={startRecording}>
								gravando uma nota
							</button>{' '}
							em áudio ou se preferir{' '}
							<button type='button' onClick={startTyping}>
								utilize apenas texto
							</button>
							.
						</p>
					)}

					{isRecording && (
						<Button onClick={stopRecording}>
							<span className='inline-block rounded-full size-3 bg-red-500 mr-2 animate-pulse-fast'></span>
							Gravando! (clique p/ interromper)
						</Button>
					)}

					{content !== '' && !isRecording && (
						<Button theme='success' type='submit' onClick={saveNote}>
							Salvar nota
						</Button>
					)}
				</form>
			</Modal>
		</DialogRoot>
	)
}
