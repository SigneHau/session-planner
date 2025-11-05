import { ModeToggle } from "@/components/modeToggle"
import { Button } from "@/components/ui/button"

const Home = () => {
  
  return (
    <main className="items-center gap-2 justify-center flex min-h-screen">
      <ModeToggle />
      <Button>Click me</Button>
    </main>
  )
}

export default Home

