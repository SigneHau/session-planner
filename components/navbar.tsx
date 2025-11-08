import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { ModeToggle } from "./modeToggle"

const Navbar = () => {
  return (
    <nav className="bg-card text-card-foreground border-b">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex gap-2 items-center bg-primary p-2">
          <Image
            className="bg-white rounded-lg"
            width={60}
            height={30}
            alt="logo"
            src="/logo.png"
          />
          <h2 className="font-black">Session planner</h2>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome, John Doe</p>
        </div>
        <div className="flex gap-4 items-center">
            <ModeToggle />
          <Link href="/signin">
            <Button variant="secondary">Log in as teacher</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
