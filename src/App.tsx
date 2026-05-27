import { MapView } from './components/MapView'
import { SidePanel } from './components/SidePanel'
import { TopBar } from './components/TopBar'
import { UnitPanel } from './components/UnitPanel'
import { useGameLoop } from './engine/useGameLoop'

function App() {
  useGameLoop()

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <SidePanel />
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex-1">
            <MapView />
          </div>
          <UnitPanel />
        </main>
      </div>
    </div>
  )
}

export default App
