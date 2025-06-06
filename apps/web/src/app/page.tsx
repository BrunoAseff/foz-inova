"use client"

const TITLE_TEXT = `                                                                                                  
███████╗ ██████╗ ██╗  ██╗    ██╗███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ 
██╔════╝██╔═══██╗╚██╗██╔╝    ██║████╗  ██║██╔═══██╗██║   ██║██╔══██╗
█████╗  ██║   ██║ ╚███╔╝     ██║██╔██╗ ██║██║   ██║██║   ██║███████║
██╔══╝  ██║   ██║ ██╔██╗     ██║██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║
██║     ╚██████╔╝██╔╝ ██╗    ██║██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║
╚═╝      ╚═════╝ ╚═╝  ╚═╝    ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝
 `;

export default function Home() {

  return (
    <div className="container w-full h-screen items-center justify-center px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
      <div className="grid gap-6">
      </div>
    </div>
  );
}
