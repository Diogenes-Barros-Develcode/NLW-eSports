import { useState } from 'react'
import { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from './assets/images/Logo.png'
import { GameBanner } from './components/GammerBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import './styles/main.css'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'


interface GameProps{
  id:string
  bannerUrl: string;
  title: string;
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<GameProps[]>([])


  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg}/>
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads}/>
          )
        })}

      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
