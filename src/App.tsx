import logo from "./assets/logo-nlw-expert.svg";
import { NoteCard } from './components/NoteCard';

export function App() {
  return (
    <div className="mx-auto my-10 max-w-6xl flex flex-col gap-6">
      <img src={logo} alt="NLW Expert" className='w-min h-6' />

      <form className="w-full">
        <input 
          type="text" 
          placeholder="Busque em suas notas..."
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none'
       />
      </form>

      <hr className='border-slate-500' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NoteCard 
          asNewNote
          title='Adicionar nota' 
          description='Grave uma nota em áudio que será convertida para texto automaticamente.' 
        />
        <NoteCard
          title='há 2 dias' 
          description='Lorem ipsum dolor sit amet.' 
        />
      </div>
    </div>
  );
}
