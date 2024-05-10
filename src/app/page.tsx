import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-ccdi-blue">
      <Logo />
      <p className="text-white text-3xl">{`Welcome CCDIAN's`}</p>
    </main>
  );
}
