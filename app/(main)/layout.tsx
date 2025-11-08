import Navbar from "@/components/navbar"


// This layout only wraps all in the main layout so that the navbar and footer is shown here

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      {children}
      {/* TODO: Create and import Footer component here */}
    </>
  )
}
