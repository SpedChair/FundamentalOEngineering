import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FE Exam Practice Platform",
  description: "Practice platform for NCEES FE Other Disciplines exam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold text-indigo-600">
                FE Exam Practice
              </h1>
              <p className="text-sm text-gray-500">
                Other Disciplines Specialization
              </p>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto p-4 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
