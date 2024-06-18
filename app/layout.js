import "./globals.css";
import { ConfigProvider } from "antd";
import ptBR from 'antd/locale/pt_BR';
import { AuthProvider } from "@/app/auth/AuthContext";

export const metadata = {
  title: "Pousada Quinta do Ypuã",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Inter"
          }
        }}
        locale={ptBR}
      >
        <html lang="en">
          <body>{children}</body>
        </html>
      </ConfigProvider>
    </AuthProvider>
  );
}
