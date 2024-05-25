import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
	theme?: 'default' | 'success'
}

export function Button({ type = 'button', theme = 'default', children, ...props }: ButtonProps) {
	const commonStyles =
		'flex justify-center items-center text-sm font-medium absolute left-0 bottom-0 right-0 h-12 outline-none transition-all '
	const themeDefault = 'text-slate-300 bg-slate-800 hover:bg-slate-900'
	const themeSuccess = 'text-stone-900 bg-lime-400 hover:bg-lime-500'
	const themeStyles = theme === 'success' ? themeSuccess : themeDefault

	return (
		<button type={type} className={commonStyles + themeStyles} {...props}>
			{children}
		</button>
	)
}
