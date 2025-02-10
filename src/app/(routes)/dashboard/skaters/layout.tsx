import Providers from "@/components/Providers";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

            <div className="flex ">
                <Providers>
                    <Sidebar />
                </Providers>


                <div className="w-full text-slate-900">
                    <Providers>{children}</Providers>

                </div>

            </div>
        </div>
    );
}