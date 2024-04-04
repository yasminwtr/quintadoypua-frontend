import "./globals.css";
import { ConfigProvider } from "antd";
import ptBR from 'antd/locale/pt_BR';

export const metadata = {
  title: "Pousada Quinta do Ypuã",
};

export default function RootLayout({ children }) {
  return (
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

  );
}
