import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { ModeToggle } from "./modeToggle"

const Navbar = () => {
  return (
    <nav className="bg-card text-card-foreground border-b">
      <div className="px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex hover:-translate-y-1 hover:border hover:border-primary hover:rounded-lg transition-all gap-2 items-center text-primary p-1"
        >
          <Image
            className="rounded-lg bg-foreground dark:bg-card"
            width={60}
            height={30}
            alt="logo"
            src="/logosimple.png"
          />
          <div className="flex flex-col gap-1">
          <p className="text-xs font-bold">Session</p>
          <p className="text-xs font-bold">planner</p>
          </div>
        </Link>

        <div>
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome, John Doe</p>
        </div>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Link href="/signin">
            <Button variant="secondary">Sign in as teacher</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
