
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import AuthProvider from './components/AuthProvider';
import Layout from './components/Layout';
import './globals.css';


// Define the Google Font
const inter = Inter({ subsets: ['latin'] });

// Metadata for the document
export const metadata = {
  title: 'SAIQO SEO Blog Post Writing eBook',
  description: 'An eBook for newbies & mid-level SEO writers | Write better blog posts for your clients and earn.',
};

// RootLayout component
export default async function RootLayout({ children }) {
  let session = null;

  try {
    // Fetch the session on the server side
    session = await getServerSession(); // Pass NextAuth options if required
  } catch (error) {
    console.error("Failed to retrieve session", error);
    // Optionally set a placeholder or handle errors here
  }




  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>

          <Layout>{children}</Layout>

        </AuthProvider>
      </body>
    </html>
  );
}
